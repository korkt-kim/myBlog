// 
import Vue from 'vue';

// class AuthService{
//     constructor(store){
//         this.$store = store;
//     }

//     get isAuthenticated(){
//         return this.$store.state.awsCognito.isAuthenticated;
//     }

//     get user(){
//         return this.$store.state.awsCognito.user;
//     }

//     get email(){
//         if(!this.user) return;
//         console.log(this.user)
//         return this.user.idToken.payload.email;
//     }
// }
// 새로고침 시 로그인 풀림방지
// export default async ({store}) => {
//     const authService = new AuthService(store);
//     Vue.prototype.$localAuth = authService;
//     Vue.$localAuth = authService;
//     await store.dispatch('localAuth/load');
// }