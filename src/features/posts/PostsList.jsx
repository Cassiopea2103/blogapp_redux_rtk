import { useFetchPostsQuery } from './postsSlice' ; 
import SinglePost from './SinglePost' ; 

const PostsList = () => {

    const { data : posts , isLoading , isSuccess , isError , error } = useFetchPostsQuery () ; 

    // dynamic content : 
    let content ; 

    if ( isLoading ) {
        content = <h1>Loading data...</h1>
    }
    if ( isSuccess ) {
        content = posts.ids.map ( postId  => <SinglePost key = { postId } post = { posts.entities [ postId ]} /> )
    }
    else if ( isError ) content = <h1 className='text-red-500'>{error.message}</h1> 


    return (
        <section className='max-w-7x flex flex-col items-center mx-auto gap-2 py-5'>
            {content}
        </section>
    )
}

export default PostsList ; 