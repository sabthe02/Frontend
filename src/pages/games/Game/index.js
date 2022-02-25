import React, { useEffect, useState, useContext, useReducer } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import './style.scss'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import { HIDE_LOADER, SHOW_LOADER } from '../../../action-types'
import { refreshToken } from '../../../utils/refresh-token'

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


const Game = ({ score, myChoice, setScore }) => {
    const { id } = useParams()
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const [house, setHouse] = useState('');
    const [playerWin, setPlayerWin] = useState('')

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


    const [counter, setCounter] = useState(3)

    const newHousePick = () => {
    const choices = ['rock', 'paper', 'scissors']
    setHouse(choices[Math.floor(Math.random() * 3)])
  }

  useEffect(() => {
    newHousePick()
  }, [])


  const navigate = useNavigate ()

  const Result = () => {
    if (myChoice === 'rock' && house === 'paper') {
      setPlayerWin('win')
      setScore(score + 1)
    } else if (myChoice === 'rock' && house === 'paper') {
      setPlayerWin('lose')
      setScore(score - 1)
    } else if (myChoice === "scissors" && house === 'paper') {
      setPlayerWin('win')
      setScore(score + 1)
    } else if (myChoice === "scissors" && house === "rock") {
      setPlayerWin('lose')
      setScore(score - 1)
    } else if (myChoice === "paper" && house === 'rock') {
      setPlayerWin('win')
      setScore(score + 1)
    } else if (myChoice === 'paper' && house === 'scissors') {
      setPlayerWin('lose')
      setScore(score - 1)
    } else {
      setPlayerWin('draw')
    }
  }

  useEffect(() => {
    const timer =
      counter > 0
        ? setInterval(() => {
            setCounter(counter - 1)
          }, 1000)
        : Result()

    return () => {
      clearInterval(timer)
    }
  }, [counter, house])

  return (
    <div className="game">
      {state.game && (
        <>
        <div className="game__you">
          <span className="text">Elegiste</span>
          <div
            className={`icon icon--${myChoice} ${
              playerWin === "win" ? `icon icon--${myChoice}--winner` : ""
            }`}
          ></div>
        </div>
        {playerWin === "win" && (
          <div className="game__play">
            <span className="text">Ganaste</span>
            <Link to='/games/:id' onClick={() => navigate (`games/${id}`), () => setHouse() }>
                  Ver resumen
              </Link>
              )}
              <Link to='/home' onClick={() => navigate ('/home') }>
                  Volver al home
              </Link>
          </div>
        )}
        {playerWin === "lose" && (
          <div className="game__play">
            <span className="text">Perdiste</span>
            <Link to='/games/:id' onClick={() => navigate (`games/${id}`), () => setHouse() }>
                  Ver resumen
              </Link>
              <Link to='/home' onClick={() => navigate ('/home') }>
                  Volver al home
              </Link>
          </div>
        )}
        {playerWin === "draw" && (
          <div className="game__play">
            <span className="text">Empate</span>
            <Link to='/games/:id' onClick={() => navigate (`games/${id}`), () => setHouse() }>
                  Ver resumen
              </Link>
              <Link to='/home' onClick={() => navigate ('/home') }>
                  Volver al home
              </Link>
          </div>
        )}

        <div className="game__house">
          <span className="text">LA computadora eligió</span>
          {counter === 0 ? (
            <div
              className={`icon icon--${house} ${
                playerWin === "lose" ? `icon icon--${house}--winner` : ""
              }`}
            ></div>
          ) : (
            <div className="counter">{counter}</div>
          )}
        </div>
        </>
      )}
            
      {state.hasError && (
          <p>Ocurrio un error al obtener la partida</p>
      )}  
      </div>
    )
  }
  

export default Game