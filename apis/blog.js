//cors error
// export async function getCategories({$axios}){
//     const {category} = await $axios.get(`https://www.blogger.com/feeds/${process.env.BLOG_ID}/posts/summary?alt=json`)
//     console.log(category)
//     return category.map(item=>item.term);
// }

export async function getAllPosts({$axios},pageToken=null){
    const {data:{nextPageToken,items}} = await $axios.get(`https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts?key=${process.env.API_KEY}&${pageToken? `pageToken=${pageToken}`:``}`);
    if(nextPageToken){
        const posts =  await getAllPosts({$axios},nextPageToken);
        items.push(posts);
    }
    return items;
}

export async function getPost({$axios}, postId){
    const {data:{title,content,replies}} = await $axios.get(`https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts/${postId}?key=${process.env.API_KEY}`);
    return {title,content,replies};
}

export async function getPostsByCategory({$axios},category){
    const {data:{items}} =await $axios.get(`https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts?labels=${category}&key=${process.env.API_KEY}`)
    return items;
}
