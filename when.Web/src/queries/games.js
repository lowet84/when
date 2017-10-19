let ongoing = async function () {
  return `
    query{
      standardGamesOngoing{
        id 
        lives 
        completedQuestions{
          year
        }
      }
    }
  `
}

let newGame = async function () {
  return `
    mutation{
      startNewStandardGame{
        result{
          id
        }
      }
    }
  `
}

export { ongoing, newGame }
