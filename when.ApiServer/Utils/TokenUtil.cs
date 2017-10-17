using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using when.ApiServer.Model;

namespace when.ApiServer.Utils
{
    public static class TokenUtil
    {
        public static string GetUserKey(HttpContext context)
        {
            try
            {
                var tokenHeader =
                    ((Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http.FrameRequestHeaders)context.Request.Headers)
                    .HeaderAuthorization;
                var token = tokenHeader.ToString().Replace("Bearer", string.Empty).Trim();
                return GetUserKey(token);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static string GetUserKey(string token)
        {
            if (string.IsNullOrEmpty(token)) return GetDebugUser;

            var tokenDecoder = new JwtSecurityTokenHandler();
            var jwtSecurityToken = (JwtSecurityToken)tokenDecoder.ReadToken(token);
            return ValidateToken(jwtSecurityToken) ? jwtSecurityToken.Subject : null;
        }

        public static string GetDebugUser => Environment.GetEnvironmentVariable("DEVUSER");

        private static bool ValidateToken(JwtSecurityToken jwtSecurityToken)
        {
            try
            {
                var audience = jwtSecurityToken.Audiences.First();
                var issuer = jwtSecurityToken.Issuer;
                var validTo = jwtSecurityToken.ValidTo;
                var validFrom = jwtSecurityToken.ValidFrom;

                var login = new Login();
                var valid = audience == login.LoginOptions.Audience;
                valid &= issuer == $"https://{login.AuthOptions.Domain}/";
                valid &= validFrom < DateTime.UtcNow;
                valid &= validTo > DateTime.UtcNow;

                return valid;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
