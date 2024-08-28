import { apiSlice } from "../api/apiSlice";

import { createEntityAdapter , createSelector } from "@reduxjs/toolkit";

import { sub } from "date-fns";

const postsAdapter = createEntityAdapter (
    {
        // sort posts by date : 
        sortComparer : ( a , b ) => b.date.localeCompare ( a.date ) 
    }
)

const initialState = postsAdapter.getInitialState ({}) ; 

export const postsSlice = apiSlice.injectEndpoints (
    {
        endpoints : ( builder ) => (
            {
                fetchPosts : builder.query (
                    {
                        query : () => (
                            {
                                url : '/posts' , 
                                method : 'GET' 
                            }
                        ) , 
                        transformResponse : responseData => {
                            let min = 1 ; 
                            const loadedPosts = responseData.map ( 
                                ( post ) => {
                                    // add date to posts : 
                                    if ( !post?.date ) {
                                        post.date = sub ( new Date () , { minutes : min } ).toISOString () ;
                                    }

                                    // add reactions : 
                                    if ( !post.reactions ) {
                                        post.reactions = {
                                            like : 0 , 
                                            love : 0 , 
                                            funny : 0 , 
                                            insightful : 0 
                                        }
                                    }

                                    return post ; 
                                }
                            )

                            // override the initial state with loaded posts : 
                            return postsAdapter.setAll ( initialState , loadedPosts ) ; 
                        } , 
                        // add tags to posts : 
                        providesTags : ( result , error , arg ) =>
                        [
                            { type : 'POST' , id : 'LIST' } , 
                            ...result.ids.map ( id => ({ type : 'POST' , id }) )
                        ]
                    }
                )
            }
        )
    }
)


// slice hooks : 
export const {
    useFetchPostsQuery ,
} = postsSlice ;

// query posts result object : 
const postsQueryResult = postsSlice.endpoints.fetchPosts.select () ; 

// memoized selector : fetched posts data 
const selectPostsData = createSelector (
    postsQueryResult , 
    posts => posts.data // returns only data from fetched posts ...
)

// posts adapter selector based on memoized selector : 
export const {
    selectAll : selectAllPosts , 
    selectById : selectPostById , 
    selectIds : selectPostIds 
} = postsAdapter.getSelectors ( state => selectPostsData ( state ) ?? initialState ) ; 