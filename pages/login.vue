<template>
  <div id="register">
    <div>
      <div >
        <h1 >Login</h1>
      </div>
      <!-- Unauthenticated -->
      <div v-if="!$localAuth.isAuthenticated">
        <form @submit.prevent="login">
          <input v-model="loginForm.email" type="email" placeholder="Email" class="form-control"/>
          <input v-model="loginForm.password" type="password" placeholder="Password" class="from-control"/>
          <button type="submit" class="button--green">Login</button>
        </form>
        <nuxt-link to="register">Need an account? Register</nuxt-link>
      </div>

      <!-- Authenticated -->
      <div v-else>
        You're logged in as {{$localAuth.email}}
        <button @click="$store.dispatch('localAuth/logout')">Logout</button>
      </div>
    </div>
    <button class="g-signin2" @click="()=>$auth.loginWith('google')"></button>
  </div>
</template>

<script>

export default {
  layout: "auth",
  head: {
    title: "polz's blog",
    meta: []
  },
  data: () =>{
    return{
      loginForm:{
        email:'',
        password:''
      },
    }
  },
  computed: {},
  methods:{
    async login(){
      try{
        await this.$store.dispatch('localAuth/login',this.loginForm);
        this.$router.push('/')
      }catch(e){
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
div#register{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  margin: 0 0.5rem;
  margin-bottom: 0.25rem;
}

input {
  font-size: 16px;
  padding: 0.75rem 1rem;
  margin: 0 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #dedede;
  border-radius: 0.5rem;
  box-shadow: none;
  box-sizing: border-box;
  color: white;
}

.button {
  margin-top: 0.5rem;
}

.button[disabled] {
  cursor: default;
  opacity: 0.5;
  cursor: not-allowed;
}
.button {
  background: var(--primary-color);
  padding: 0.75rem 1.5rem;
  outline: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  letter-spacing: 0.5px;
  margin: 0 0.5rem;
}

button:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  opacity: 0.8;
}
</style>
