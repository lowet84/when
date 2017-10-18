using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary;
using when.ApiServer.Model;

namespace when.ApiServer.Utils
{
    public static class GameUtil
    {
        private const BindingFlags Flags =
            BindingFlags.Instance
            | BindingFlags.GetProperty
            | BindingFlags.SetProperty
            | BindingFlags.GetField
            | BindingFlags.SetField
            | BindingFlags.NonPublic;

        public static void Scrub(this StandardGame standardGame)
        {
            var question = standardGame.CurrentQuestion;
            if (question != null)
            {
                ForceSetValue(question, "Year", -1);
            }
        }

        private static void ForceSetValue(object item, string propertyName, object value)
        {
            var fields = GetFields(item.GetType());
            var field = fields.First(d => d.Name.StartsWith($"<{propertyName}>"));
            field.SetValue(item, value);
        }

        private static IEnumerable<FieldInfo> GetFields(Type type)
        {
            var ret = new List<FieldInfo>(type.GetFields(Flags));
            if (type.BaseType != null)
            {
                ret.AddRange(GetFields(type.BaseType));
            }
            return ret.ToArray();
        }

        public static (StandardGame, bool) EvaluateStandardGame(this StandardGame game, int index)
        {
            if (game.CurrentQuestion == null)
            {
                return (null, false);
            }

            var smaller = game.CompletedQuestions.Where((d, i) => i < index);
            var bigger = game.CompletedQuestions.Where((d, i) => i >= index);
            var success = smaller.All(d => d.Year <= game.CurrentQuestion.Year) &&
                          bigger.All(d => d.Year >= game.CurrentQuestion.Year);
            var lives = game.Lives;
            if (!success) lives--;

            var questions = game.CompletedQuestions.ToList();
            questions.Add(game.CurrentQuestion);
            questions = questions.OrderByDescending(d => d.Year).ToList();

            var nextQuestion = lives > 0 ? questions.Next() : null;
            var newGame = new StandardGame(nextQuestion, questions.ToArray(), lives);

            return (newGame, success);
        }
    }
}
