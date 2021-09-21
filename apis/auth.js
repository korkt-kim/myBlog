export async function login(userId, password) {
  try {
    const res = await this.$axios.post(`/api/auth/signin`, {
      password: password,
      usernameOrEmail: userId
    });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || e.message);
  }
}

export async function signup(username, password, email, firstName, lastName) {
  try {
    const res = await this.$axios.post(`/api/auth/signup`, {
      password,
      username,
      email,
      firstName,
      lastName
    });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || e.message);
  }
}

export async function getUserInfo(accessToken) {
  try {
    const res = await this.$axios.post("api/users/me", {
      headers: { Authorization: accessToken }
    });
    return res.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || e.message);
  }
}
