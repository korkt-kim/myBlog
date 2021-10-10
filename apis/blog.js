const blogId = `5210420534154293578`;

export async function getCategories(){
    const {category} = await this.$axios.get(`https://zakelstorm.blogspot.com/feeds/posts/summary?alt=json&max-results=0`)
    return category.map(item=>item.term);
}

export async function getAllPosts(pageToken=null){
    const {data:{nextPageToken,items}} = await this.$axios.get(`https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts?key=${process.env.API_KEY}&${pageToken? `pageToken=${pageToken}`:``}`);
    if(nextPageToken){
        const posts =  await getAllPosts(nextPageToken);
        items.push(posts);
    }
    return items;
}

export async function getPost(postId){
    const {data:{title,content,replies}} = await this.$axios.get(`https://www.googleapis.com/blogger/v3/blogs/${process.env.BLOG_ID}/posts/${postId}?key=${process.env.API_KEY}`);
    return {title,content,replies};
}

// export async function getPostsByCategory(){

// }
