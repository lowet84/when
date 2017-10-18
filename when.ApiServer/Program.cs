using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Hosting;
using when.ApiServer.Model;

namespace when.ApiServer
{
    public class Program
    {
        public const string DatabaseName = "when";

        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .UseUrls("http://*:7000")
                .Build();

            Seed();
            host.Run();
        }

        public static void Seed()
        {
            var context = new UserContext();
            var existing = context.GetAll<Question>(UserContext.ReadType.Shallow);
            var parallel = 10;
            var samplesPerYear = 10;
            if (existing.Length == 0)
            {
                var questions = new List<Question>();
                var years = Enumerable.Range(1900, 118).ToList();
                while (years.Count > 0)
                {
                    var current = years.Take(parallel).ToList();
                    var tasks = current.Select(d => new Task<List<Question>>(() => GetQuestions(d, samplesPerYear))).ToList();
                    tasks.ForEach(d => d.Start());
                    Task.WaitAll(tasks.ToArray());
                    var results = tasks.Select(d => d.Result).SelectMany(d => d).ToList();
                    current.ForEach(d => years.Remove(d));
                    questions.AddRange(results);
                }
                for (int index = 0; index < questions.Count; index++)
                {
                    var question = questions[index];
                    context.AddDefault(question);
                    Console.WriteLine($"{index + 1}/{questions.Count}");
                }
            }
        }

        public static List<Question> GetQuestions(int year, int samples)
        {
            var ret = new List<Question>();
            var random = new Random();
            using (var client = new HttpClient())
            {
                var context = new UserContext();
                Console.WriteLine($"Seeding: {year}");
                var html = client.GetStringAsync($"http://www.onthisday.com/events/date/{year}").Result;
                var doc = new HtmlDocument();
                doc.LoadHtml(html);
                var texts = doc.DocumentNode
                    .Descendants("li")
                    .Where(d =>
                        d.Attributes.Contains("class")
                        &&
                        d.Attributes["class"].Value.Contains("event-list__item")
                    ).Select(d => d.LastChild.InnerText).ToList();

                foreach (var text in texts.OrderBy(x => random.Next()).Take(samples))
                {
                    var question = new Question(text, year);
                    ret.Add(question);
                }
            }

            return ret;
        }
    }
}
