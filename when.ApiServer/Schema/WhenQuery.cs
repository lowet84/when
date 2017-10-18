﻿using System;
using System.Linq;
using GraphQlRethinkDbLibrary;
using GraphQL.Conventions.Relay;
using when.ApiServer.Model;
using when.ApiServer.Utils;

namespace when.ApiServer.Schema
{
    [ImplementViewer(OperationType.Query)]
    public class WhenQuery
    {
        public User User(UserContext context)
        {
            context.Authorize();
            return context.GetCurrentUser(UserContext.ReadType.WithDocument);
        }

        public StandardGame[] StandardGamesOngoing(UserContext context)
        {
            var id = context.GetCurrentUser(UserContext.ReadType.Shallow).Id.ToString();
            var games = context.Search<StandardGame>(
                expr => expr.Filter(
                    game => game.G("CurrentQuestion").Ne(null).And(game.G("User").Eq(id))), UserContext.ReadType.WithDocument);
            games.ToList().ForEach(d=>d.Scrub());
            return games;
        }

        public StandardGame[] StandardGamesFinished(UserContext context)
        {
            var id = context.GetCurrentUser(UserContext.ReadType.Shallow).Id.ToString();
            var games = context.Search<StandardGame>(
                expr => expr.Filter(
                    game => game.G("CurrentQuestion").Eq(null).And(game.G("User").Eq(id))), UserContext.ReadType.WithDocument);
            return games;
        }
    }
}
