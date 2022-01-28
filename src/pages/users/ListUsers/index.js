import './style.scss'
import React, { useEffect, useContext, useReducer } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import { refreshToken } from '../../../utils/refresh-token'
import { HIDE_LOADER, SHOW_LOADER } from '../../../action-types'

const initialState = {
    users: undefined,
    isFetching: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_USERS_REQUEST':
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                isFetching: false,
                users: action.payload.users
            }
        case 'FETCH_USERS_FAILURE':
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
            type: 'FETCH_USERS_REQUEST'
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
                type: 'FETCH_USERS_SUCCESS',
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
                    type: 'FETCH_USERS_FAILURE'
                })
            }
        }).finally(() => {
            authDispatch({
                type: HIDE_LOADER
            })
        })
    }, [authDispatch, authState.token, authState.refreshToken, navigate])

    return (
        <div className="list-users">
            {state.users && (
                <>
                    <p>
                        Listado de users
                    </p>
                    <p>
                        Titulo: {state.users.nickname}
                    </p>
                </>
            )}

            {state.hasError && (
                <p>Ocurrio un error al obtener los jugadores</p>
            )}

            <Link to="/home">Volver a home</Link>
        </div>
    )
}

export default ListUsers
