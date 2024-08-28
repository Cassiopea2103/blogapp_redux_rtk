import { selectAllUsers } from "./usersSlice";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";


const UsersList = () => {

    // get all users : 
    const users = useSelector ( selectAllUsers ) ; 

    // users content : 
    let userContent = users.map (
        user => (
            <li key={user.id}> <Link to={`/users/${user.id}`} className="text-blue-500 hover:text-cyan-700">{ user.username }</Link></li>
        )
    )

    return (
        <section className="pt-5">
            <ul className="flex flex-col gap-2 items-center justify-center">
                { userContent }
            </ul>
        </section>
    )
}

export default UsersList ; 