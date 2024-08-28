import { createEntityAdapter , createSelector } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice' ; 

// users adapter : 
const usersAdapter = createEntityAdapter ({}) ; 

// initial state : 
const initialState = usersAdapter.getInitialState ({}) ;

// injected endpoints to apiSlice : 
const usersSlice = apiSlice.injectEndpoints (
    {
        endpoints : ( builder ) => (
            {
                // fetch users : 
                fetchUsers : builder.query (
                    {
                        query : () => (
                            {
                                url : '/users' , 
                                method : 'GET'
                            }
                        ) , 
                        transformREsponse : responseData => {
                            responseData.map (
                                user => {
                                    // convert its id to number : 
                                    user.id = Number ( user.id ) ; 

                                    return user ; 
                                }
                            )

                            // set initial state to fetched users data : 
                            return usersAdapter.setAll ( initialState , responseData ) ; 
                        }
                    }
                )
            }
        )
    }
)

// slice hook : 
export const { useFetchUsersQuery } = usersSlice ; 

// fetch users query result : 
const queryResult = usersSlice.endpoints.fetchUsers.select() ; 

// memoized fetch users data selector : 
const selectUsersData = createSelector (
    queryResult => queryResult.data 
)

// users adapter selectors based on memoized data : 
export const {
    selectAll : selectAllUsers , 
    selectById : selectUserById , 
    selectIds : selectUsersIds 
} = usersAdapter.getSelectors ( state => selectUsersData ( state ) ?? initialState ) ; 