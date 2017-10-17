using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary;

namespace when.ApiServer.Utils
{
    public static class AuthUtil
    {
        public static void Authorize(this UserContext context)
        {
            if (context.UserName == null)
            {
                throw new AuthenticationException("Not authorized");
            }
        }
    }
}
