<template>
  <div>
    <form v-on:submit.prevent="onSignup">
      <label for="userId">UserId</label>
      <input v-model="userId" type="text" id="userId" />
      <label for="password">Password</label>
      <input v-model="password" type="password" id="password" />
      <label for="password">Email</label>
      <input v-model="email" type="email" id="email" />
      <div>
        <label for="password">FirstName</label>
        <input v-model="firstName" id="firstName" />
        <label for="password">LastName</label>
        <input v-model="lastName" id="lastName" />
      </div>
      <button class="button" :disabled="isButtonDisabled">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  layout: "auth",
  data() {
    return {
      userId: "",
      password: "",
      email: "",
      lastName: "",
      firstName: ""
    };
  },
  computed: {
    isButtonDisabled() {
      return !(
        this.userId &&
        this.password &&
        this.email &&
        this.firstName &&
        this.lastName
      );
    }
  },
  methods: {
    async onSignup() {
      try {
        const res = await axios.post(`http://localhost:8080/api/auth/signup`, {
          password: this.password,
          username: this.userId,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName
        });
        console.log(res);
      } catch (e) {
        console.log(e);
        console.log(e.data);
        console.log(e.status);
        console.log(e.res);
        console.log(e.response);
        for (let key in e) {
          console.log(key);
        }
        // console.log(e.)
        this.openDialog({
          title: "Signup Failed",
          content: e.response.data.message || e.message
        });
      } finally {
      }
    },
    ...mapMutations({
      openDialog: "dialog/openDialog"
    })
  }
};
</script>

<style scoped>
div {
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
