import { Auth } from 'aws-amplify';

export const state = () =>({
    user: null
})

export const getters={
    user(state){
        return state.user;
    }
}

export const mutations = {
    set(state,user){
        state.user= user;
    }
}

export const actions = {
    async load({commit}){
        try{
            const user = await Auth.currentSession();
            commit('set',user);
        }catch(e){
            commit('set',null);
        }
    },

    async checkUser({commit}){
        try{
            const user =  await Auth.currentAuthenticatedUser();
            commit('set',user);
            return user;
        }catch(e){
            commit('set',null);
        }
        
    },

    async signup(_,{email,password,name}){
        const user = await Auth.signUp({
            username:email,
            password,
            attributes:{
                name
            }
        })
        return user;
    },

    async confirmRegistration(_,{email,code}){
        return await Auth.confirmSignUp(email,code);
    },

    async login({commit},{email,password}){
        try{
            const user=  await Auth.signIn(email,password);
            commit('set',user);
            return user;
        }catch(e){
            commit('set',null);
            throw new Error('Login failed. Check email address and password.');
        }
    },

    async logout({commit}){
        await Auth.signOut();
        commit('set',null);
    },

    async federatedSigninGoogle(){
        Auth.federatedSignIn({
            provider:"Google"
        })
    },

    async federatedSignOut(){
        Auth.federatedSignOut()
    },
}