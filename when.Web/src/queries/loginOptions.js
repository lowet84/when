export default async function () {
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
