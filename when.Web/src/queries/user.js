let getUser = async function () {
  return `
    query{
      user{
        userName
      }
    }
  `
}

let setUsername = async function (username) {
  return `
    mutation{
      setUserName(userName:"${username}"){
        clientMutationId}
      }
  `
}

export { getUser, setUsername }
