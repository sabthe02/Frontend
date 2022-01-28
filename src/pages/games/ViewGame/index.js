import './style.scss'
import React, { useEffect, useContext, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import { refreshToken } from '../../../utils/refresh-token'
import { HIDE_LOADER, SHOW_LOADER } from '../../../action-types'

const initialState = {
    game: undefined,
    isFetching: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_GAME_REQUEST':
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case 'FETCH_GAME_SUCCESS':
            return {
                ...state,
                isFetching: false,
                game: action.payload.game
            }
        case 'FETCH_GAME_FAILURE':
            return {
                ...state,
                isFetching: false,
                hasError: true
            }
        default:
            return state
    }
}

function ViewGame() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)

    useEffect(() => {
        authDispatch({
            type: SHOW_LOADER
        })

        dispatch({
            type: 'FETCH_GAME_REQUEST'
        })

        fetch(apiUrl(`games/${id}`), {
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
                type: 'FETCH_GAME_SUCCESS',
                payload: data
            })
        }).catch(error => {
            console.error('Error en fetch del juego', error.status)

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
                    type: 'FETCH_GAME_FAILURE'
                })
            }
        }).finally(() => {
            authDispatch({
                type: HIDE_LOADER
            })
        })
    }, [id, authDispatch, authState.token, authState.refreshToken, navigate])

    return (
        <div className="view-game">
            {state.game && (
                <>
                    <p>
                        Pagina para ver el game id: {id}
                    </p>
                    <p>
                        Titulo: {state.game.id}
                    </p>
                    
           {/*  <div className="card">
                <div className="card-body">
                <h4 className="card-title">Oponente: {game.opponent}</h4>
                    <p className="card-text"> Puntos obtenidos: {game.score}</p>
                    <p className="card-title">Puntos obtenidos oponente: {game.opp_score}</p>
                    <p className="card-title">Resultado: {game.result}</p>
                    <p className="card-title">jugadas: {game.choices}</p>
                </div>
            </div> */}
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
