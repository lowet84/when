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

let current = async function (id) {
  return `
    query{
      standardGame(id:"${id}"){
        completedQuestions{
          text year
        }
        currentQuestion{
          text
        }
        id
        lives
      }
    }
  `
}

let answer = async function (id, index) {
  return `
    mutation{
      answerStandard(gameId:"${id}" index:${index}){
        success
        result{
          completedQuestions
          {
            text
            year
          }
          currentQuestion{
            text
          }
          lives
          id
        }
      }
    }
  `
}

let removeAll = async function () {
  return `
    mutation{
      removeAllStandardGames{
        result
      }
    }
  `
}

export { ongoing, newGame, current, removeAll, answer }
