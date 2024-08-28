import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = () => {

    // retrieve users : 
    const users = useSelector ( state => selectAllUsers ( state ) ) ; 

    // temporary state : 
    const [ userId , setUserId ] = useState ( '' ) ; 
    const [ title , setTitle ] = useState ( '' ) ; 
    const [ body , setBody ] = useState ( '' ) ; 

    // user options : 
    const userOptions = users.map ( 
        user => (
            <option key = { user.id } value={user.id}>{ user.name }</option>
        )
    )

    // submit handle function : 
    const handleSubmit= async ( ) => {

    }


    return <section className='max-w-2xl flex flex-col items-center mx-auto gap-4 py-10 px-32 w-full'>
                <h1 className="text-3xl font-bold font-serif">Create a New Post</h1>

                <form className="flex flex-col gap-4 w-full mx-auto" onSubmit={handleSubmit}>
                    <div className="w-full bg-slate-200 ">
                        <select className="w-full py-2 rounded-md" name="" id="">
                            <option value="">Select post Author</option>
                            { userOptions }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="title">Post Title :</label>
                        <input 
                            className="w-full py-2 rounded-md"
                            type="text" 
                            required
                            value = { title }
                            // onChange = { onTitleChange }
                        />
                    </div>

                    <div>
                        <label htmlFor="body">Body :</label>
                        <textarea 
                            className="w-full py-2 rounded-md"
                            id="body"
                            required
                            rows={5}
                            value = { title }
                            // onChange = { onTitleChange }
                        >

                        </textarea>
                    </div>

                    <div>
                        <button className="w-full ml-auto bg-teal-600 text-white px-2 py-2 rounded-md flex justify-between items-center" onClick = { handleSubmit }>
                            <span>Create Post</span>
                            <FontAwesomeIcon icon = { faUpload } />
                        </button>
                    </div>
                </form>
                
            </section>
}

export default NewPost ; 