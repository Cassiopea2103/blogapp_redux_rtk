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
                                    // convert id type to Number : 
                                    post.id = Number ( post.id ) ; 
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
                ) , 

                // fetch posts by user id : 
                fetchPostsByUser : builder.query (
                    {
                        query : ({ userId }) => (
                            {
                                url : `/posts/?userId=${userId}` ,
                                method : 'GET' ,
                            }
                        ) ,
                        // transform response ( date and reactions ) : 
                        transformResponse : responseData => {
                            responseData.map (
                                userPost => {
                                    // add date if not present : 
                                    let min = 1 ; 
                                    if ( !userPost.date ) {
                                        userPost.date = sub ( new Date () , { minutes : min ++ } ).toISOString () ; 
                                    }

                                    // add reactions if not exist : 
                                    if ( !userPost.reactions ) {
                                        userPost.reactions = {
                                            like : 0 , 
                                            love : 0 , 
                                            funny : 0 , 
                                            insightful : 0 
                                        }
                                    }

                                    // return the transform item : 
                                    return userPost ; 
                                }
                            )

                            // update cached users : 
                            return postsAdapter.setAll ( initialState , responseData ) ; 
                        } , 

                        // invalidate tags : 
                        providesTags : ( result , error , arg ) => [
                            ...result.ids.map ( id => ({ type : 'POST' , id }) )
                        ]
                    }
                ) ,

                // create a new post: 
                createNewPost : builder.mutation (
                    {
                        query : ( requestData ) => (
                            {
                                url : '/posts' , 
                                method : 'POST' , 
                                body : {
                                    ...requestData , 
                                    // convert id to number : 
                                    id : Number ( requestData.id ) , 
                                    // convert userId to number : 
                                    userId : Number ( requestData.userId ) ,
                                    // add date : 
                                    date : new Date ().toISOString () , 
                                    // add reactions : 
                                    reactions : {
                                        like : 0 , 
                                        love : 0 , 
                                        funny : 0 , 
                                        insightful : 0 
                                    }
                                }
                            }
                        ) , 
                        invalidatesTags : ( result , error , arg ) => [
                            { type : "POST" , id : 'LIST' }
                        ] , 
                    }
                ) , 

                // update post : 
                updatePost : builder.mutation (
                    {
                        query : requestData => (
                            {
                                url : `/posts/${ requestData.id }` , 
                                method : 'PUT' , 
                                body : {
                                    ...requestData , 
                                    // update date : 
                                    date : new Date ().toISOString () 
                                }
                            }
                        ) , 
                        invalidatesTags : ( result , error , arg ) => [
                            { type : 'POST' , id : arg.id }
                        ]
                    }
                ) , 

                // delete post : 
                deletePost : builder.mutation ( 
                    {
                        query : ( { id } ) => (
                            {
                                url : `/posts/${id}` , 
                                method : 'DELETE' , 
                                body : { id }
                            }
                        ) , 
                        invalidatesTags : ( result , error , arg ) => [
                            { type : 'POST' , id : arg.id }
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
    useFetchPostsByUserQuery , 
    useCreateNewPostMutation , 
    useUpdatePostMutation , 
    useDeletePostMutation , 
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
