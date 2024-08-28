import { Routes , Route } from "react-router-dom";

import Layout from "./components/layout/" ;

import PostsList from './features/posts/PostsList' ; 

import SingleUser from "./features/users/SingleUser";

const App = () => {
    return (
        <Routes>
            <Route path="/" element = { <Layout /> } >
                
                <Route index element = { <PostsList /> } />
                <Route path="/posts" >
                    
                </Route>

                <Route path = "/users" >
                    {/* <Route index element = { <Users /> } /> */}
                    <Route path=":userId" element = { <SingleUser /> } />
                </Route>
            </Route>
        </Routes>
    )
}

export default App ; 