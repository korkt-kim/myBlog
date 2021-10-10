
export async function getUserInfo({$axios}){
  const {data:{blog_user_info:blogUserInfo}}  = await $axios.get(`https://www.googleapis.com/blogger/v3/users/self/blogs/${process.env.BLOG_ID}?key=${process.env.API_KEY}`);
  return blogUserInfo
}
