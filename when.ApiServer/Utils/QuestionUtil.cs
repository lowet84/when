using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary;
using when.ApiServer.Model;

namespace when.ApiServer.Utils
{
    public static class QuestionUtil
    {
        public static Question Next(this List<Question> previous)
        {
            while (true)
            {
                var question = GetRandomQuestion();
                if (!previous.Select(d => d.Id).Contains(question.Id))
                    return question;
            }
        }

        public static Question GetRandomQuestion()
        {
            var context = new UserContext();
            var question = context.Search<Question>(expr => expr.Sample(1), UserContext.ReadType.Shallow).Single();
            return question;
        }
    }
}
