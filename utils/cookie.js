export const setCookie = (key, value) => {
  document.cookie = `${key}=${value};`;
};
export const getCookie = key => {
  const value = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
  return (value && value[2]) || null;
};
export const delCookie = key => {
  const cookie = `${key}=;Expires=${new Date().toUTCString()}`;
  document.cookie = cookie;
};
