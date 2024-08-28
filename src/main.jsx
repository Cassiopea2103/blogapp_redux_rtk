import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter , Routes , Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './app/store.js'

import { usersSlice } from './features/users/usersSlice.js'
import { postsSlice } from './features/posts/postsSlice.js'

// dispatch fetch methods for users & posts to load data @ start : 
store.dispatch ( usersSlice.endpoints.fetchUsers.initiate () ) ; 
store.dispatch ( postsSlice.endpoints.fetchPosts.initiate () ) ;

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store = { store }>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element = { <App /> } />
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
