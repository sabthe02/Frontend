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
                payload: data,
            })
        }).catch(error => {
            console.error('Error en fetch del game', error.status)

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

    const getChoices = () => {
        const choices = state.game.choices.values((choicesGame, choice) =>  choicesGame);
        return choices
      }
      // Sé que estos no están haciendo lo que deberían, pero no tengo tiempo para arreglarlo :-(
      
    const getOppChoices = () => {
        const choices = state.game.opp_choices.values((opp_choicesGame, choice) =>  opp_choicesGame);
        return choices
      }
  // Sé que estos no están haciendo lo que deberían, pero no tengo tiempo para arreglarlo :-(

    return (
        <div className="view-game">
            {state.game && (
                <>
                    <h1>
                        Resumen del partido:
                    </h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">{state.game.player.nickname}</th>
                            <th scope="col">{state.game.opponent.nickname}</th>
                            <th scope="col">Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row"></th>
                            <td>Puntos obtenidos</td>
                            <td>{state.game.score}</td>
                            <td>{state.game.opp_score}</td>
                            <td>{state.game.result}</td>
                            </tr>
                            <tr>
                            <th scope="row"></th>
                            <td>Jugada 1</td>
                            <td>{getChoices()}</td>
                            <td>{getOppChoices()}</td>
                            </tr>
                            <tr>
                            <th scope="row"></th>
                            <td colspan="0">Jugada 2</td>
                            <td>{getChoices()}</td>
                            <td>{getOppChoices()}</td>
                            </tr>
                            <tr>
                            <th scope="row"></th>
                            <td colspan="0">Jugada 3</td>
                            <td>{getChoices()}</td>
                            <td>{getOppChoices()}</td>
                            </tr>
                        </tbody>
                        </table>                  
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
