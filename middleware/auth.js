//add role of user if loggedIn
import {getUserInfo} from '~/apis/auth'

export default async function({ store,$auth,$axios }) {
  if(!$auth.$state.loggedIn){
    return;
  }
  const {role} = await getUserInfo({$axios});
  store.$auth.$state.user.role=role
  console.log(store.$auth.$state.user.role);
}
