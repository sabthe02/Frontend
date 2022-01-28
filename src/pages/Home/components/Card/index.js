import './style.scss'
import React, { useContext } from 'react'
import { TiTick } from 'react-icons/ti'
import { AiOutlineStop } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../../../App'
import { GamesContext } from '../..'
import { apiUrl } from '../../../../utils/api-url'
import { refreshToken } from '../../../../utils/refresh-token'

function Card({ game }) {
    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const { state: gamesState, dispatch: gamesDispatch } = useContext(GamesContext)

    const checkStateOfGame = () => {
        fetch(apiUrl(`/games/${game.id}/check-if-finished`), {
            method: 'PATCH',
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
            gamesDispatch({
                type: 'UPDATE_GAME',
                payload: data
            })
        }).catch(error => {
            console.error('Error al obtener el estado de la partida', error)

            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => checkStateOfGame
                )
            } else if (error.status === 403) {
                navigate('/forbidden')
            } else {
                // manejar caso de error (mostrar alerta tipo toast)
                alert('Error al intentar cambiar el estado de la partida')
            }
        })
    }

    const ViewGame = () => {
        navigate(`/games/${game.id}`)
    }

    return (
        <div className="game-card col">
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">Oponente: {game.opponent}</h4>
                    <p className="card-text"> Puntos obtenidos: {game.score}</p>
                    <p className="card-title">Puntos obtenidos oponente: {game.opp_score}</p>
                    <p className="card-title">Resultado: {game.result}</p>
                </div>

                <div class="btn-group" role="group" aria-label="Basic example">
                    <button
                        type="button"
                        className="btn btn-success">
                        {game.finished ? (
                            <TiTick color="white" />
                        ) : (
                            <button type="button"
                                className="btn btn-success"
                                onClick={() => navigate(`/games/${game.id}`)}
                >               Retomar
                            </button>
                        )}
                    </button>
                    {game.finished ? (
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={ViewGame}>
                        Ver resumen de la partida
                    </button>
                    ) : ( 
                        <button
                        type="button"
                        className="btn btn-outline-danger">
                        <AiOutlineStop color="red" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card