﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Types;
using GraphQL.Conventions;

namespace when.ApiServer.Model
{
    public class StandardGame : NodeBase<StandardGame>
    {
        public Question CurrentQuestion { get; }
        public Question[] CompletedQuestions { get; }
        public int Lives { get; }

        public StandardGame(Question currentQuestion, Question[] completedQuestions, int lives)
        {
            CurrentQuestion = currentQuestion;
            CompletedQuestions = completedQuestions;
            Lives = lives;
        }
    }
}
