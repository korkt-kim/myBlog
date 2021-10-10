//create new axios instance
// add authorization on header when request, if has token in storage
export default function({ $axios,$auth, app }, inject) {
  const axios = $axios.create({});
  axios.setBaseURL(process.env.baseUrl);
  axios.onRequest(config => {
    const token = $auth.strategy.token.get() || "";
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
