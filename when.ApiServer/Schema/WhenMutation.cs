using System.Linq;
using GraphQlRethinkDbLibrary;
using GraphQlRethinkDbLibrary.Schema.Output;
using GraphQL.Conventions;
using GraphQL.Conventions.Relay;
using when.ApiServer.Model;
using when.ApiServer.Schema.Output;
using when.ApiServer.Utils;

namespace when.ApiServer.Schema
{
    [ImplementViewer(OperationType.Mutation)]
    public class WhenMutation
    {
        public DefaultResult<User> SetUserName(UserContext context, string userName)
        {
            context.Authorize();
            var existingUser = context.GetCurrentUser(UserContext.ReadType.Shallow);
            User newUser;

            if (existingUser == null)
            {
                newUser = new User(context.UserName, userName);
                context.AddDefault(newUser);
            }
            else
            {
                newUser = new User(existingUser.UserId, userName);
                context.UpdateDefault(newUser, existingUser.Id);
            }

            return new DefaultResult<User>(newUser);
        }

        public DefaultResult<StandardGame> StartNewStandardGame(UserContext context)
        {
            context.Authorize();
            var seed = QuestionUtil.GetRandomQuestion();

            Question firstQuestion;
            while (true)
            {
                firstQuestion = QuestionUtil.GetRandomQuestion();
                if (firstQuestion.Id != seed.Id)
                {
                    break;
                }
            }

            var game = new StandardGame(firstQuestion, new[] { seed }, 3);
            context.AddDefault(game);

            game.Scrub();
            return new DefaultResult<StandardGame>(game);
        }

        public StandardGameResult AnswerStandard(UserContext context, Id gameId, int index)
        {
            var tempContext = new UserContext("query{dummy{lives id completedQuestions{id year text} currentQuestion{id year text}}}");
            var game = tempContext.Get<StandardGame>(gameId);
            if (game == null) return null;

            var evaluated = game.EvaluateStandardGame(index);
            context.UpdateDefault(evaluated.Item1, game.Id);
            evaluated.Item1.Scrub();
            return new StandardGameResult(evaluated.Item1, evaluated.Item2);
        }
    }
}
