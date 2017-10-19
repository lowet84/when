import { getUser, setUsername } from './user'
import { state as loginState, options as loginOptions } from './login'
import { ongoing, newGame } from './games'

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
  }
}
