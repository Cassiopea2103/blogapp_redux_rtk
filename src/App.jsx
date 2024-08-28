import { Routes , Route } from "react-router-dom";

import Layout from "./components/layout/" ;

import PostsList from './features/posts/PostsList' ; 
import NewPost from "./features/posts/NewPost";
import EditDeletePost from './features/posts/EditDeletePost' ; 

import SingleUser from "./features/users/SingleUser";
import UsersList from "./features/users/UsersList";

const App = () => {
    return (
        <Routes>
            <Route path="/" element = { <Layout /> } >
                
                <Route index element = { <PostsList /> } />
                <Route path="/posts" >
                    <Route path = "new" element =  { <NewPost /> } />
                    <Route path = ":postId" element = { <EditDeletePost /> } />
                </Route>

                <Route path = "/users" >
                    <Route index element = { <UsersList /> } />
                    <Route path=":userId" element = { <SingleUser /> } />
                </Route>
            </Route>
        </Routes>
    )
}

export default App ; 