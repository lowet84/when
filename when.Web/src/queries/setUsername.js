export default async function (username) {
  return `
    mutation{
      setUserName(userName:"${username}"){
        clientMutationId}
      }
  `
}
