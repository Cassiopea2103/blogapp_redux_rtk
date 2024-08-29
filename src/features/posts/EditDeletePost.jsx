import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { selectPostById , useFetchPostsQuery } from "./postsSlice";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh , faTrash } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react";
import { useNavigate , useParams  } from "react-router-dom";

import { useUpdatePostMutation , useDeletePostMutation } from "./postsSlice";

const EditDeletePost = () => {

    const { data: posts } = useFetchPostsQuery () ;
    
    const navigate = useNavigate () ; 

    // retrieve post id from request params : 
    const { postId } = useParams () ; 
    // get post with given id : 
    const post = useSelector ( state => selectPostById ( state , Number ( postId ) ) ) ; 
    // retrieve users : 
    const users = useSelector ( state => selectAllUsers ( state ) ) ; 

    // temporary state : 
    const [ userId , setUserId ] = useState ( post.userId ) ; 
    const [ title , setTitle ] = useState ( post.title ) ; 
    const [ body , setBody ] = useState ( post.body ) ; 

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

    // update post mutation : 
    const [ updatePost , { isLoading } ] = useUpdatePostMutation () ; 
    // delete post mutation : 
    const [ deletePost ] = useDeletePostMutation () ; 

    // can create post condition : 
    const canSave = [ userId , title , body ].every ( Boolean ) && !isLoading  ; 

    // submit handle function : 
    const handleUpdate= async () => { 
        if ( canSave ) {
            // await post creation : 
            await updatePost ( { id : postId , userId , title , body  } ) ; 

            // reset state values : 
            setUserId ( '' ) ; 
            setTitle ( '' ) ; 
            setBody ( '' ) ; 

            // navigate to posts list : 
            navigate ( '/' ) ; 
        }
    }

    const handleDelete = async () => {
        await deletePost ( { id : postId } ).unwrap () ; 

        navigate ('/')
    }


    return <section className='max-w-2xl flex flex-col items-center mx-auto gap-4 py-10 px-32 w-full'>
                <h1 className="text-3xl font-bold font-serif">Edit or Delete Post</h1>

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

                    <div className="flex gap-4 ">
                        <button disabled = { !canSave } className={`w-full ml-auto  text-white px-2 py-2 rounded-md flex justify-between items-center ${ canSave ? 'bg-green-800 cursor-pointer' : 'bg-slate-400'}`} onClick = { handleUpdate }>
                            <span>Update</span>
                            <FontAwesomeIcon icon = { faRefresh } />
                        </button>

                        <button disabled = { !canSave } className={`w-full ml-auto  text-white px-2 py-2 rounded-md flex justify-between items-center bg-red-700`} onClick = { handleDelete }>
                            <span>Delete</span>
                            <FontAwesomeIcon icon = { faTrash } />
                        </button>
                    </div>
                </form>
                
            </section>
}

export default EditDeletePost ; 