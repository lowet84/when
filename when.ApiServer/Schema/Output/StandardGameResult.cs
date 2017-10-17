using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Output;
using when.ApiServer.Model;

namespace when.ApiServer.Schema.Output
{
    public class StandardGameResult : DefaultResult<StandardGame>
    {
        public bool Success { get; }

        public StandardGameResult(StandardGame result, bool success) : base(result)
        {
            Success = success;
        }
    }
}
