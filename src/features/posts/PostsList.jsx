import { useFetchPostsQuery } from './postsSlice' ; 

const PostsList = () => {

    const { data , isLoading , isSuccess , isError , error } = useFetchPostsQuery () ; 


    return <h1>{JSON.stringify ( data )}</h1>
}

export default PostsList ; 