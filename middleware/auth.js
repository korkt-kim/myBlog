export default async function({store}) {
  const user= store.getters['awsCognito/user'];
  if(!user){
    await store.dispatch("awsCognito/checkUser");
  }
}