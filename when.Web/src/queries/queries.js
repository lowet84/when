import { getUser, setUsername } from './user'
import { state as loginState, options as loginOptions } from './login'
import { ongoing, newGame, current, removeAll, answer } from './games'

export default async function (query, args) {
  switch (query) {
    // User
    case 'user':
      return getUser()
    case 'setUsername':
      return setUsername(args.username)

    // Login
    case 'loginState':
      return loginState()
    case 'loginOptions':
      return loginOptions()

    // Games
    case 'ongoingGames':
      return ongoing()
    case 'startNewGame':
      return newGame()
    case 'currentGame':
      return current(args.id)
    case 'removeAllStandardGames':
      return removeAll()
    case 'answerStandard':
      return answer(args.id, args.index)
  }
}
