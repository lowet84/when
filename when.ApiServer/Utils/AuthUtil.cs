using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary;
using when.ApiServer.Model;

namespace when.ApiServer.Utils
{
    public static class AuthUtil
    {
        public static User Authorize(this UserContext context)
        {
            if (context.UserName == null)
            {
                throw new AuthenticationException("Not authorized");
            }
            var user = context.GetCurrentUser(UserContext.ReadType.Shallow);
            if (user == null)
            {
                throw new AuthenticationException("No username set");
            }

            return user;
        }

        public static User GetCurrentUser(this UserContext context, UserContext.ReadType readType)
        {
            return context
                .Search<User>(expr => expr.Filter(u => u.G("UserId").Eq(context.UserName)), readType)
                .SingleOrDefault();
        }
    }
}
