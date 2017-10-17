using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary;
using when.ApiServer.Model;

namespace when.ApiServer.Utils
{
    public static class UserUtil
    {
        public static User GetCurrentUser(this UserContext context, UserContext.ReadType readType)
        {
            return context.Search<User>(expr => expr.Filter(u => u.G("UserId").Eq(context.UserName)), readType).SingleOrDefault();
        }
    }
}
