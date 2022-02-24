import React, { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'
import { refreshToken } from '../../../utils/refresh-token'


const Game = ({ score, myChoice, setScore }) => {
  
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const [house, setHouse] = useState('');
    const [playerWin, setPlayerWin] = useState('')

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
      <div className="game__you">
        <span className="text">Elegiste</span>
        <div
          className={`icon icon--${myChoice} ${
            playerWin == "win" ? `icon icon--${myChoice}--winner` : ""
          }`}
        ></div>
      </div>
      {playerWin == "win" && (
        <div className="game__play">
          <span className="text">Ganaste</span>
            <Link to='/games/:id' onClick={() => navigate ('/games/:id'), () => setHouse() }>
                Ver resumen
            </Link>
            <Link to='/home' onClick={() => navigate ('/home') }>
                Volver al home
            </Link>
        </div>
      )}
      {playerWin == "lose" && (
        <div className="game__play">
          <span className="text">Perdiste</span>
          <Link to='/games/:id' className="view-game" onClick={() => navigate ('/games/:id'), () => setHouse() }>
                Ver resumen
            </Link>
            <Link to='/home' className="return-home" onClick={() => navigate ('/home') }>
                Volver al home
            </Link>
        </div>
      )}
      {playerWin == "draw" && (
        <div className="game__play">
          <span className="text">Empate</span>
          <Link to='/games/:id' className="view-game" onClick={() => navigate ('/games/:id'), () => setHouse() }>
                Ver resumen
            </Link>
            <Link to='/home' className="return-home" onClick={() => navigate ('/home') }>
                Volver al home
            </Link>
        </div>
      )}

      <div className="game__house">
        <span className="text">LA computadora eligió</span>
        {counter == 0 ? (
          <div
            className={`icon icon--${house} ${
              playerWin == "lose" ? `icon icon--${house}--winner` : ""
            }`}
          ></div>
        ) : (
          <div className="counter">{counter}</div>
        )}
      </div>
    </div>
  )
}



/* 
  return (
    <div className="game">
      Mi elección:{myChoice} <br />
      Elección del oponente:{house} <br />
    
      Resultado:
      {playerWin == "win" && <h2>Ganaste</h2>}
      {playerWin == "lose" && <h2>Perdiste</h2>}
      {playerWin == "draw" && <h2>Empate</h2>}
    
      <Link to='/games/:id' onClick={() => navigate ('/games/:id') }>
        Ver resumen
      </Link>
      <Link to='/home' onClick={() => navigate ('/home') }>
        Volver al home
      </Link>
    </div>
  )
} */

export default Game