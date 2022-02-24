import './style.scss'
import React, { useContext, useEffect, useReducer, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import { refreshToken } from '../../../utils/refresh-token'
import UserCard from './UserCard'
import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from '../action-types'
import { HIDE_LOADER, SHOW_LOADER } from '../../../action-types'

export const UsersContext = createContext()

const initialState = {
    users: [],
    isFetching: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.payload.users
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                hasError: true
            }
        default:
            return state
    }
}

function ListUsers() {
    const navigate = useNavigate()
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)

    useEffect(() => {
        authDispatch({
            type: SHOW_LOADER
        })

        dispatch({
            type: FETCH_USERS_REQUEST
        })

        fetch(apiUrl('/users'), {
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: data
            })
        }).catch(error => {
            console.error('Error en fetch de los users', error.status)

            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate
                )
            } else if (error.state === 403) {
                navigate('/forbidden')
            } else {
                dispatch({
                    type: FETCH_USERS_FAILURE
                })
            }
        }).finally(() => {
            authDispatch({
                type: HIDE_LOADER
            })
        })
    }, [authDispatch, authState.token, authState.refreshToken, navigate])

    return (
            <UsersContext.Provider value={{ state, dispatch }}>
                <main className="page-home container mb-5">
                    <div className="bg-light p-4 rounded">
    
                        <div id="Card-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {state.isFetching ? (
                                <>
                                    <div className="User-card col">
                                        <div className="card">
                                            <div className="card-body">
                                                <Skeleton height={30} />
                                                <Skeleton count={4} />
                                            </div>
                                        </div>
                                    </div>
    
                                    <div className="User-card col">
                                        <div className="card">
                                            <div className="card-body">
                                                <Skeleton height={30} />
                                                <Skeleton count={4} />
                                            </div>
                                        </div>
                                    </div>
    
                                    <div className="User-card col">
                                        <div className="card">
                                            <div className="card-body">
                                                <Skeleton height={30} />
                                                <Skeleton count={4} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : state.hasError ? (
                                <span className="error">Ocurrió un error</span>
                            ) : (
                                <>
                                {state.users.length > 0 ? (
                                    state.users.map(user => (
                                        <UserCard key={user.id} user={user} />
                                    ))
                                ) : (
                                    <div id="create-new-user-hint">
                                        <p>
                                            Aun no hay usuarios registrados :(
                                        </p>
                                    </div>
                                )}
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </UsersContext.Provider>
        )
}

export default ListUsers
