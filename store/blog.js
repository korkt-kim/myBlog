import {API} from 'aws-amplify';

export const state = () =>({
    categories:[]
})

export const getters = {
    categories(state){
        return state.categories;
    }
}

export const mutations = {
    setCategories(state,categories){
        state.categories = categories;
    }
}

export const actions = {
    async getCategories({commit}){
        const categories = await API.get('bloggerapi','/blog/category');
        categories.sort((item1,_)=>item1.parent ? 1 : -1)
        commit('setCategories',categories);
    }
}