import './style.scss'
import React, { useContext, useEffect, useReducer, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { AuthContext } from '../../App'
import { apiUrl } from '../../utils/api-url'
import { refreshToken } from '../../utils/refresh-token'
import Card from './components/Card'
import { FETCH_GAMES_FAILURE, FETCH_GAMES_REQUEST, FETCH_GAMES_SUCCESS } from './action-types'
import { HIDE_LOADER, SHOW_LOADER } from '../../action-types'

export const GamesContext = createContext()

const initialState = {
    games: [],
    isFetching: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_GAMES_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case FETCH_GAMES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                games: action.payload.games
            }
        case FETCH_GAMES_FAILURE:
            return {
                ...state,
                hasError: true,
                isFetching: false
            }
        
        default:
            return state
    }
}

function Home() {
    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (authState.token) {
            authDispatch({
                type: SHOW_LOADER
            })

            dispatch({
                type: FETCH_GAMES_REQUEST
            })
    
            fetch(apiUrl('games'), {
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
                    type: FETCH_GAMES_SUCCESS,
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
                        type: FETCH_GAMES_FAILURE
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
        <GamesContext.Provider value={{ state, dispatch }}>
            <main className="page-home container mb-5">
                <div className="bg-light p-4 rounded">

                    <div id="Card-container" className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {state.isFetching ? (
                            <>
                                <div className="playedGame-card col">
                                    <div className="card">
                                        <div className="card-body">
                                            <Skeleton height={30} />
                                            <Skeleton count={4} />
                                        </div>
                                    </div>
                                </div>

                                <div className="playedGame-card col">
                                    <div className="card">
                                        <div className="card-body">
                                            <Skeleton height={30} />
                                            <Skeleton count={4} />
                                        </div>
                                    </div>
                                </div>

                                <div className="playedGame-card col">
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
                            {state.games.length > 0 ? (
                                state.games.map(game => (
                                    <Card key={game.id} game={game} />
                                ))
                            ) : (
                                <div id="create-new-game-hint">
                                    <p>
                                        Aun no hay partidas jugadas :(
                                    </p>
                                </div>
                            )}
                            </>
                        )}
                    </div>
                </div>
                <button className ="fab fab-fixed d-flex justify-content-center align-items-center bg-primary"
                onClick={() => navigate('/users')}>
                 <i className="bi bi-plus"></i>
                </button>
            </main>
        </GamesContext.Provider>
    )
}

export default Home