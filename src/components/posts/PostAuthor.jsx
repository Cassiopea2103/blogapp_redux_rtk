import { useSelector } from "react-redux";
import { selectUserById } from "../../features/users/usersSlice";

const PostAuthor = ( { userId }) => {
    

    // retrieve post user : 
    const postUser = useSelector ( state => selectUserById ( state , Number ( userId ) ) ) ; 

    return <span>@{ postUser.username }</span>
}

export default PostAuthor ; 