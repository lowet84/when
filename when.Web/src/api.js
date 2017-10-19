import Axios from 'axios'
import { getAccessToken } from './auth'
import queries from './queries/queries'

const host = 'api'

export default async function (query, args) {
  let queryText = await queries(query, args)
  var escapedQuery = queryText
    .replace(/"/g, '\\"')
  let queryString = '{query:"' + escapedQuery + '"}'
  var accessToken = getAccessToken()
  var headers = null
  if (accessToken !== null) {
    headers = { headers: { Authorization: `Bearer ${accessToken}` } }
  }

  var ret = await Axios.post(host, queryString, headers)
  return ret.data.data
}
