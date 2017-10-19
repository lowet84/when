import decode from 'jwt-decode'
import auth0 from 'auth0-js'
import Api from './api'
const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'

var auth = null
var authOptions = null
var loginOptions = null

export async function login () {
  console.log('logging in')
  if (authOptions === null) {
    let authResult = await Api('loginOptions')
    loginOptions = authResult.loginOptions.loginOptions
    authOptions = authResult.loginOptions.authOptions
    auth = new auth0.WebAuth(authOptions)
  }
  loginOptions.redirectUri = window.location.href
  auth.authorize(loginOptions)
}

export async function logout () {
  clearIdToken()
  clearAccessToken()
}

export function requireAuth (to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export function getIdToken () {
  return localStorage.getItem(ID_TOKEN_KEY)
}

export function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearIdToken () {
  localStorage.removeItem(ID_TOKEN_KEY)
}

function clearAccessToken () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Helper function that will allow us to extract the access_token and id_token
async function getParameterByName (name) {
  let match = RegExp('[#&/]*' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

// Get and store access_token in local storage
export async function setAccessToken () {
  let accessToken = await getParameterByName('access_token')
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

// Get and store id_token in local storage
export async function setIdToken () {
  let idToken = await getParameterByName('id_token')
  localStorage.setItem(ID_TOKEN_KEY, idToken)
}

export function isLoggedIn () {
  const idToken = getIdToken()
  const accessToken = getAccessToken()
  let loggedIn = !!idToken && !isTokenExpired(idToken) &&
    !!accessToken && !isTokenExpired(accessToken)
  return loggedIn
}

function getTokenExpirationDate (encodedToken) {
  if (encodedToken === undefined) return undefined
  const token = decode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)
  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  let UTCnow = new Date()
  return expirationDate < UTCnow
}
