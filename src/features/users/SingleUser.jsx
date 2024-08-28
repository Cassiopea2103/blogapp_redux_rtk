import { useParams , Link } from "react-router-dom";

import { useFetchPostsByUserQuery } from "../posts/postsSlice";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";

import SinglePost from "../posts/SinglePost";

const SingleUser = () => {

    // retrieve id from request params : 
    const { userId } = useParams () ; 

    const postAuthor = useSelector ( state => selectUserById ( state , userId ) ) ; 

    const { 
        data : userPosts , 
        isLoading , 
        isSuccess , 
        isError , 
        error  
    } = useFetchPostsByUserQuery ( { userId } ) ; 

    let content ; 

    if ( isLoading ) {
        content = <h1>Loading user posts...</h1>
    }
    else if ( isError ) {
        content = <h1>{error.message}</h1>
    }
    else if ( isSuccess ) {
        content = (
            <>
                <h1 className = "text-5xl mb-7">{ postAuthor.username } posts </h1>
                {
                    userPosts.ids.map ( 
                        postId => (
                            <SinglePost key = { postId } post = { userPosts.entities [ postId ] } />
                        )
                     )
                }
            </>
        )
    }

    

    return (
        <section className='max-w-7xl flex flex-col items-center mx-auto gap-2 py-5'>
            { content }
        </section>
    )
}

export default SingleUser ; 