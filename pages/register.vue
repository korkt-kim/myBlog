<template>
    <div id="register">
        <div>
            <div >
                <h1 >Register</h1>
            </div>
            <div>
                <!-- Register-->
                <form v-if="step===steps.register" @submit.prevent="register">
                <input v-model="registerForm.email" type="email" placeholder="Email" class="form-control"/>
                <input v-model="registerForm.password" type="password" placeholder="Password" class="from-control"/>
                <button type="submit" class="button--green">Register</button>
                </form>
                <!-- Confirm Registration-->
                <form v-else @submit.prevent="confirm">
                <input v-model="confirmForm.email" type="email" placeholder="Email" class="form-control"/>
                <input v-model="confirmForm.code" placeholder="Code" class="from-control"/>
                <button type="submit" class="button--green">Confirm</button>
                </form>
                <nuxt-link to="login">Have an account? Login</nuxt-link>
            </div>

            <!-- Authenticated -->
            <div>
                You're logged in - go you!
            </div>
        </div>
    </div>
</template>

<script>
const steps = {
  register: 'REGISTER',
  confirm : 'CONFIRM'
}
export default {
    data: () =>{
        return{
            steps: {...steps},
            step: steps.register,
            registerForm:{
                email:'',
                password:''
            },
            confirmForm:{
                email:'',
                code:''
            }
        }
    },
    methods:{
        async register(){
				try{
					await this.$store.dispatch('localAuth/register',this.registerForm);
					this.confirmForm.email = this.registerForm.email;
					this.step = this.steps.confirm;
				}catch(e){
					console.log(e)
				}
    },
    async confirm(){
				try{
					await this.$store.dispatch('localAuth/confirmRegistration',this.confirmForm);
					await this.$store.dispatch('localAuth/login',this.registerForm);
					this.$router.push('/');
				}catch(e){
					console.log(e)
				}
			}
    }
}
</script>

<style>

</style>