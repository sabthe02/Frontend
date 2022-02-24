import './style.scss'
import React, { useEffect, useContext, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import { refreshToken } from '../../../utils/refresh-token'
import { HIDE_LOADER, SHOW_LOADER} from '../../../action-types'

const initialState = {
    game: undefined,
    isFetching: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_GAMES_REQUEST':
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case 'FETCH_GAMES_SUCCESS':
            return {
                ...state,
                isFetching: false,
                game: action.payload.games
            }
        case 'FETCH_GAMES_FAILURE':
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        
        default:
            return state
    }
}

function ViewGame({ game }) {
    const navigate = useNavigate()
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)

    useEffect(() => {
        if (authState.token) {
            authDispatch({
                type: SHOW_LOADER
            })

            dispatch({
                type: 'FETCH_GAMES_REQUEST'
            })
    
            fetch(apiUrl('games/users'), {
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
                    type: 'FETCH_GAMES_SUCCESS',
                    payload: data
                })
            }).catch(error => {
                console.error('Error en fetch de los juegos', error)

                if (error.status === 401) {
                    refreshToken(
                        authState.refreshToken,
                        authDispatch,
                        navigate
                    )
                } else if (error.status === 403) {
                    navigate('/forbidden')
                } else {
                    dispatch({
                        type: 'FETCH_GAMES_FAILURE'
                    })
                }
            }).finally(() => {
                authDispatch({
                    type: HIDE_LOADER
                })
            })
        }
    }, [authDispatch, authState.token, authState.refreshToken, navigate])

    return (
        <div className="view-game">
            {state.game && (
                <>
                    <p>
                        Oponente: {game.opponent}
                        Puntos obtenidos: {game.score}
                        Puntos obtenidos oponente: {game.opp_score}
                        Resultado: {game.result}
                        Jugadas: {game.choices}
                        Finalizada: {game.finished}
                    </p>
                    
                </>
            )}
            
            {state.hasError && (
                <p>Ocurrio un error al obtener la partida</p>
            )}

            <Link to="/home">Volver a home</Link>
        </div>
    )
}

export default ViewGame
