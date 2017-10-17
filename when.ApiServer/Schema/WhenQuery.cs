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
    }
}
