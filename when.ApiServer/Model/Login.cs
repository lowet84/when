﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Types;

namespace when.ApiServer.Model
{
    public class Login
    {
        public LoginOptions LoginOptions => new LoginOptions();
        public AuthOptions AuthOptions => new AuthOptions();
    }

    public class LoginOptions
    {
        public string ResponseType => "token id_token";
        public string Audience => Environment.GetEnvironmentVariable("AUTH_AUDIENCE");
        public string Scope => Environment.GetEnvironmentVariable("AUTH_SCOPE");
    }

    public class AuthOptions
    {
        public string ClientID => Environment.GetEnvironmentVariable("AUTH_CLIENT_ID");
        public string Domain => Environment.GetEnvironmentVariable("AUTH_DOMAIN");
    }
}
