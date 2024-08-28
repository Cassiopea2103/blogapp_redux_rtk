import { Routes , Route } from "react-router-dom";

import Layout from "./components/layout/" ;
import PostsList from './features/posts/PostsList' ; 

const App = () => {
    return (
        <Routes>
            <Route path="/" element = { <Layout /> } >
                
                <Route index element = { <PostsList /> } />
                <Route path="/posts" >
                    
                    
                </Route>
            </Route>
        </Routes>
    )
}

export default App ; 