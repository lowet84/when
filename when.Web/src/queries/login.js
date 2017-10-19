let state = async function () {
  return `
    query{
      loginState
    }
  `
}

let options = async function () {
  return `
  query{
    loginOptions{
      authOptions{
        clientID domain
      } 
      loginOptions{
        audience responseType scope
      }
    }
  }
  `
}

export { state, options }
