using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary;
using GraphQlRethinkDbLibrary.Handlers;
using Microsoft.AspNetCore.Http;
using when.ApiServer.Utils;

namespace when.ApiServer.Handlers
{
    public class GraphQlHandler<TQuery, TMutation> : GraphQlDefaultHandler<TQuery, TMutation>
    {
        private string _user;

        public override Task Process(HttpContext context)
        {
            _user = TokenUtil.GetUserKey(context);
            return base.Process(context);
        }

        public override UserContext GetUserContext(string body)
        {
            return new UserContext(body, _user);
        }
    }
}
