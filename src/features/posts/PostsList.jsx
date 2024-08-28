import { useFetchPostsQuery } from './postsSlice' ; 
import SinglePost from './SinglePost' ; 

import { Link } from 'react-router-dom';

const PostsList = () => {

    const { data : posts , isLoading , isSuccess , isError , error } = useFetchPostsQuery () ; 

    // dynamic content : 
    let content ; 

    if ( isLoading ) {
        content = <h1>Loading data...</h1>
    }
    if ( isSuccess ) {
        content = (
            <>
                <Link to={'/posts/new'} className='border border-green-600 bg-white px-4 py-1 rounded-md text-green-800 flex gap-1 items-center ml-[400px] hover:bg-green-600 hover:text-white'>
                    <span>Create a new post</span>
                </Link>

                { posts.ids.map ( postId  => <SinglePost key = { postId } post = { posts.entities [ postId ]} /> ) }
            </>
        )
    }
    else if ( isError ) content = <h1 className='text-red-500'>{error.message}</h1> 


    return (
        <section className='max-w-7xl flex flex-col items-center mx-auto gap-2 py-5'>
            {content}
        </section>
    )
}

export default PostsList ; 