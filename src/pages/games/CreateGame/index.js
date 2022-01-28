import './style.scss'
import React, { useMemo, useState, useReducer, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import { refreshToken } from '../../../utils/refresh-token'


const initialState = {
    nickname: '',
    password: '',
    token: '',
    isSending: false,
    hasError: false
}


/* const [ state, dispatch ] = useReducer(reducer, initialState)
const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
const navigate = useNavigate()

    const reducer = (state, action) => {
        switch (action.type) {
            case 'GAME_INPUT_CHANGE':
                return {
                    ...state,
                    [action.payload.input]: action.payload.value
                }
            case 'CREATE_GAME_REQUEST':
                return {
                    ...state,
                    isSending: true,
                    hasError: false
                }
            case 'CREATE_GAME_SUCCESS':
                return {
                    ...state,
                    isSending: false,
                    game: action.payload.game
                }
            case 'CREATE_GAME_FAILURE':
                return {
                    ...state,
                    isSending: false,
                    hasError: true
                }
            default:
                return state
        }
    }

        fetch(apiUrl('games'), {
            method: 'POST',
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: state.nickname,
                password: state.password,
                token: state.token
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            dispatch({
                type: 'CREATE_GAME_SUCCESS',
                payload: data
            })

            navigate('/game')
        }).catch(error => {
            console.error('Error en crear game', error)

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
                    type: 'CREATE_GAME_FAILURE'
                })
            }
        }) */

    function CreateGame() {
    const [selected, setSelected] = useState("")
    const [computedSelected, setComputedSelected] = useState("")
    
    const choices = ["Piedra", "Papel", "Tijera"]
    
    const play = () => {
        if (!selected) {
          return
        }
        const computerChoiceIndex = Math.floor(Math.random() * choices.length)
        setComputedSelected(choices[computerChoiceIndex])
      }
    
      const result = useMemo(() => {
        if (computedSelected === selected) {
          return 'Empate'
        } else {
          if (
            (computedSelected === "Piedra" && selected === "Tijera") ||
            (computedSelected === "Papel" && selected === "Piedra") ||
            (computedSelected === "Tijera" && selected === "Pepel")
          ) {
            return "ganó tu oponente"
          }
          return "ganaste"
        }
      }, [computedSelected, selected])
    
        return (
            <div>
            <div className="create-game container mb-5">
                <div className="card">
                    <div className="container">
                    <button onClick={() => setSelected("Piedra")}>Piedra</button>
                    <button onClick={() => setSelected("Papel")}>Papel</button>
                    <button onClick={() => setSelected("Tijera")}>Tijera</button>
                </div>
            </div>
        </div>
          <button onClick={play}>jugar</button>
          <p>tu elección: {selected}</p>
          <p>elección del oponente: {computedSelected}</p>
          <div>{result}</div>
        </div>
      )
    }
// a cambiar por el juego
   /*  return (
        <div className="create-game container mb-5">
            <div className="card">
                <div className="container">
                    <h1>Crear partida</h1>

                    <label htmlFor="nickname">
                        nickname
                        <input
                            type="text"
                            value={state.nickname}
                            onChange={handleInputChange}
                            name="nickname"
                            id="nickname"
                        />
                    </label>

                    <label htmlFor="password">
                        Contraseña
                        <input
                            type="password"
                            value={state.password}
                            onChange={handleInputChange}
                            name="password"
                            id="password"
                        />
                    </label>

                    <label htmlFor="token">
                        Token
                        <input
                            type="password"
                            value={state.token}
                            onChange={handleInputChange}
                            name="token"
                            id="token"
                        />
                    </label>

                    <button onClick={handleFormSubmit} disabled={state.isSubmitting}>
                        {state.isSubmitting ? (
                            "Espere..."
                        ) : (
                            "Ingresar"
                        )}
                    </button>

                    {state.errorMessage && (
                        <span className="form-error">{state.errorMessage}</span>
                    )}
                </div>
            </div>
        </div>
    ) */
/* }
 */
export default CreateGame
