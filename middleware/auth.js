//redirect to login page if accessToken is not valid
export default async function({ app, redirect }) {
  const accessToken = app.$cookies.get("accessToken") || "";
  const isAuthenticated = (await app.$axios.get("api/users/me", {
    headers: { Authorization: accessToken }
  }))
    ? true
    : false;
  if (!isAuthenticated) {
    app.$cookies.remove("accessToken");
    redirect({ name: "login" });
  }
}
