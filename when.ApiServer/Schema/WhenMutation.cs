﻿using System.Linq;
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
            var existingUser = context.Authorize(AuthMode.UserId);
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
            var user = context.Authorize();
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

            var game = new StandardGame(firstQuestion, new[] { seed }, 3, user);
            context.AddDefault(game);

            game.Scrub();
            return new DefaultResult<StandardGame>(game);
        }

        public StandardGameResult AnswerStandard(UserContext context, Id gameId, int index)
        {
            var user = context.Authorize();
            var tempContext = new UserContext("query{dummy{user{id} lives id completedQuestions{id year text} currentQuestion{id year text}}}");
            var game = tempContext.Get<StandardGame>(gameId);
            if (user?.Id != game?.User.Id) return null;

            var evaluated = game.EvaluateStandardGame(index);
            context.UpdateDefault(evaluated.Item1, game.Id);
            evaluated.Item1.Scrub();
            return new StandardGameResult(evaluated.Item1, evaluated.Item2);
        }

        public DefaultResult<bool> RemoveAllStandardGames(UserContext context)
        {
            var user = context.Authorize();
            var games = context.Search<StandardGame>(
                expr => expr.Filter(
                    game => game.G("User").Eq(user.Id.ToString())), UserContext.ReadType.Shallow);
            foreach (var standardGame in games)
            {
                context.Remove<StandardGame>(standardGame.Id);
            }
            return new DefaultResult<bool>(true);
        }
    }
}
