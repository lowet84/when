using System;
using System.Linq;
using GraphQlRethinkDbLibrary;
using GraphQL.Conventions;
using GraphQL.Conventions.Relay;
using when.ApiServer.Model;
using when.ApiServer.Utils;

namespace when.ApiServer.Schema
{
    [ImplementViewer(OperationType.Query)]
    public class WhenQuery
    {
        public LoginStates LoginState(UserContext context)
        {
            if (context.UserName == null)
                return LoginStates.NotLoggedIn;
            var user = context.GetCurrentUser(UserContext.ReadType.Shallow);
            return user == null ? LoginStates.NoUsername : LoginStates.LoggedIn;
        }

        public Login LoginOptions(UserContext context)
        {
            return new Login();
        }

        public User User(UserContext context)
        {
            return context.Authorize();
        }

        public StandardGame[] StandardGamesOngoing(UserContext context)
        {
            var id = context.Authorize().Id.ToString();
            var games = context.Search<StandardGame>(
                expr => expr.Filter(
                    game => game.G("CurrentQuestion").Ne(null).And(game.G("User").Eq(id))), UserContext.ReadType.WithDocument);
            games.ToList().ForEach(d=>d.Scrub());
            return games;
        }

        public StandardGame[] StandardGamesFinished(UserContext context)
        {
            var id = context.Authorize().Id.ToString();
            var games = context.Search<StandardGame>(
                expr => expr.Filter(
                    game => game.G("CurrentQuestion").Eq(null).And(game.G("User").Eq(id))), UserContext.ReadType.WithDocument);
            return games;
        }

        public StandardGame StandardGame(UserContext context, Id id)
        {
            var user = context.Authorize();
            var game = context.Get<StandardGame>(id, UserContext.ReadType.Shallow);
            if (game.User.Id != user.Id) return null;

            var ret =  context.Get<StandardGame>(id);
            return ret;
        }
    }

    public enum LoginStates
    {
        NotLoggedIn,
        NoUsername,
        LoggedIn
    }
}
