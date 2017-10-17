using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Types;

namespace when.ApiServer.Model
{
    public class User : NodeBase<User>
    {
        public string UserId { get; }
        public string UserName { get; }

        public User(string userId, string userName)
        {
            UserId = userId;
            UserName = userName;
        }
    }
}
