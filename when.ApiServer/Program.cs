using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
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
            //var parallel = 10;
            //var samplesPerYear = 10;
            if (existing.Length == 0)
            {
                var questions = new List<Question>();
                var json = Resource.Questions;
                var data = JsonConvert.DeserializeObject<QuestionData[]>(json);

                foreach (var item in data)
                {
                    questions.Add(new Question(item.question, item.year));
                }
                
                for (int index = 0; index < questions.Count; index++)
                {
                    var question = questions[index];
                    context.AddDefault(question);
                    Console.WriteLine($"{index + 1}/{questions.Count}");
                }
            }
        }

        private class QuestionData
        {
            public string question { get; set; }
            public string category { get; set; }
            public string extraInfo { get; set; }
            public int year { get; set; }
        }
    }
}
