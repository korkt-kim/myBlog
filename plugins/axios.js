//create new axios instance
export default function({ $axios, redirect, app }, inject) {
  const axios = $axios.create({});
  axios.setBaseURL(process.env.baseUrl);
  axios.onRequest(config => {
    const token = app.store.state.accessToken || "";
    if (token) {
      if (config.method !== "OPTIONS") {
        config.headers.Authorization = `${token}`;
      }
    }
    return config;
  });

  // axios.onResponse(response => {
  //   return response.data;
  // });

  // axios.onError(error => {
  //   if (!error || !error.response || !error.response.state) {
  //     app.$notify({
  //       group: "all",
  //       title: "network error",
  //       text: "can not connect to the server",
  //       type: "info"
  //     });
  //     return;
  //   }
  // });

  inject("axios", axios);
}
