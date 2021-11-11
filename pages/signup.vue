<template>
  <div id="register">
    <h1 >Sign Up</h1>
    <div v-if="messages.positiveMessage" class="positive-message">{{messages.positiveMessage}}</div>
    <div v-if="messages.errorMessage" class="error-message">{{messages.errorMessage}}</div>
    <form  @submit.prevent="localSignup">
        <input v-model="loginForm.email" type="email" placeholder="Email" class="form-control"/>
        <input v-model="loginForm.password" type="password" placeholder="Password" class="from-control"/>
        <input v-model="loginForm.name" type="text" placeholder="name" class="form-control"/>
        <button class="button--green">Sign Up</button>
    </form>
		<div class="OAuth">
    	<button id="btnConnectGoogle" class="OAuthbtn" @click="federatedSignup('google')">Sign Up With Google</button>
		</div>
    <div><nuxt-link to="login">Already have an account? Login</nuxt-link></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  head: {
    title: "polz's blog",
    meta: []
  },
  data: () =>{
    return{
      loginForm:{
        email:'',
        password:'',
        name:''
      },
      messages:{
        errorMessage:'',
        positiveMessage:'',
      }
    }
  },
  mounted(){
      
  },
  computed: {},
  methods:{
    ...mapActions('awsCognito',[
      'federatedSigninGoogle',
      'signup',
      'checkUser'
    ]),
    async localSignup(){
      try{
        await this.signup(this.loginForm);
        this.setPositiveMessage(`verification mail is sent to ${this.loginForm.email}`)
        this.loginForm={};
      }catch(e){
        console.error(e.message)
        this.setErrorMessage(e.message)
      }
    },
    federatedSignup(resourceOwner){
      try{
        switch (resourceOwner){
          case 'google':
            this.federatedSigninGoogle();
            return;
          default:
            throw new Error('not validate request')
        }
      }catch(e){
        console.error(e)
        this.setErrorMessage(e.message)
      }
    },
    setPositiveMessage(positiveMessage){
      this.messages.positiveMessage=positiveMessage;
      this.messages.errorMessage='';
    },
    setErrorMessage(errorMessage){
      this.messages.positiveMessage='';
      this.messages.errorMessage=errorMessage;
    }
  }
};
</script>

<style lang="scss" scoped>
div#register{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .error-message{
    color:black;
    background:orange;
    border: 3px solid red;
    width:29rem;
  }
  .positive-message{
    color:black;
    background:greenyellow;
    border:3px solid green;
    width:29rem;
  }
  form{
		width:29rem;
		display: flex;
  	flex-direction: column;
		&>*{
			margin:1rem 0;
		}
		input {
			font-size: 1rem;
			padding: 0.75rem 1rem;
			border: 2px solid #dedede;
			border-radius: 0.5rem;
			box-shadow: none;
			box-sizing: border-box;
			color: white;
		}
		label {
			font-size: 1rem;
			margin: 0 0.5rem;
			margin-bottom: 0.25rem;
		}

    .gender-input{
			display:flex;
			justify-content: space-evenly;
    }
  } 
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
.OAuth{
	margin: 1.5rem 0;
	.OAuthbtn{
	text-align: center;
	position: relative;
	display: block;
	box-sizing: border-box;
	width:15rem;
	height: 3.5rem;
	line-height: 3rem;
	margin: 7px 0 10px 0;
	text-align: center;
	border-radius: 3px;
	font-size: 0.8rem;
	text-decoration: none;
	
	}
	#btnConnectGoogle{
		color: #fff;
		background-color: red;
	}

}


</style>
