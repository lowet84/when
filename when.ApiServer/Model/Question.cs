using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Types;

namespace when.ApiServer.Model
{
    public class Question : NodeBase<Question>
    {
        public string Text { get; }
        public int Year { get; }

        public Question(string text, int year)
        {
            Text = text;
            Year = year;
        }
    }
}
