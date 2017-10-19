import user from './user'
import loginState from './loginState'
import loginOptions from './loginOptions'

export default async function (query, args) {
  switch (query) {
    case 'user': return user()
    case 'loginState' : return loginState()
    case 'loginOptions' : return loginOptions()
  }
}
