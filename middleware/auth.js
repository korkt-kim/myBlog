export default function({store}) {
  const user= store.getters['awsCognito/user'];
  if(!user){
    store.dispatch("awsCognito/checkUser");
  }
}