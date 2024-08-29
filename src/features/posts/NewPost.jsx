import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { useFetchPostsQuery } from "./postsSlice";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateNewPostMutation } from "./postsSlice";

const NewPost = () => {

    const navigate = useNavigate () ; 

    const { data:posts} = useFetchPostsQuery() ; 

    // retrieve users : 
    const users = useSelector ( state => selectAllUsers ( state ) ) ; 
    // retrieve post ids : 
    const postIds = posts.ids ; 

    // temporary state : 
    const [ userId , setUserId ] = useState ( '' ) ; 
    const [ title , setTitle ] = useState ( '' ) ; 
    const [ body , setBody ] = useState ( '' ) ; 

    // state change handle : 
    const onUserIdChange = e => setUserId ( e.target.value ) ; 
    const onTitleChange = e => setTitle ( e.target.value ) ; 
    const onBodyChange = e => setBody ( e.target.value ) ;

    // user options : 
    const userOptions = users.map ( 
        user => (
            <option key = { user.id } value={user.id}>{ user.name }</option>
        )
    )

    // get create post method from mutation : 
    const [ createPost , { isLoading } ] = useCreateNewPostMutation () ;
    
    // can create post condition : 
    const canSave = [ userId , title , body ].every ( Boolean ) && !isLoading ; 

    // submit handle function : 
    const handleSubmit= async ( ) => {

        // post id : 
        const postId = postIds.length ? postIds.length + 1 : 1 ; 

        if ( canSave ) {
            // await post creation : 
            await createPost ( { id : postId , userId , title , body } ) ; 

            // reset state values : 
            setUserId ( '' ) ; 
            setTitle ( '' ) ; 
            setBody ( '' ) ; 

            // navigate to posts list : 
            navigate ( '/' ) ; 
        }
        
    }


    return <section className='max-w-2xl flex flex-col items-center mx-auto gap-4 py-10 px-32 w-full'>
                <h1 className="text-3xl font-bold font-serif">Create a New Post</h1>

                <form className="flex flex-col gap-4 w-full mx-auto" >
                    <div className="w-full bg-slate-200 ">
                        <select value={userId} onChange={ onUserIdChange } className="w-full py-2 rounded-md" name="userId" id="userId">
                            <option value="">Select post Author</option>
                            { userOptions }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="title">Post Title :</label>
                        <input 
                            className="w-full py-2 rounded-md px-2"
                            placeholder = "Your post title goes here..."
                            type="text" 
                            required
                            value = { title }
                            onChange = { onTitleChange }
                        />
                    </div>

                    <div>
                        <label htmlFor="body">Body :</label>
                        <textarea 
                            className="w-full py-2 rounded-md px-2"
                            placeholder = "Enter a body..."
                            id="body"
                            required
                            rows={5}
                            value = { body }
                            onChange = { onBodyChange }
                        >

                        </textarea>
                    </div>

                    <div>
                        <button disabled = { !canSave } className={`w-full ml-auto  text-white px-2 py-2 rounded-md flex justify-between items-center ${ canSave ? 'bg-teal-600 cursor-pointer' : 'bg-slate-400'}`} onClick = { handleSubmit }>
                            <span>Create Post</span>
                            <FontAwesomeIcon icon = { faUpload } />
                        </button>
                    </div>
                </form>
                
            </section>
}

export default NewPost ; 