import './style.scss'
import React from 'react'
import { TiTick } from 'react-icons/ti'
import { AiOutlineStop } from 'react-icons/ai'
import { useNavigate } from 'react-router'

function Card({ game }) {
    const navigate = useNavigate()

    const ViewGame = () => {
        navigate(`/games/${game.id}`)
    }

    return (
        <div className="game-card col">
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">Oponente: {game.opponent.nickname}</h4>
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
                                onClick={() => navigate('/games/')}
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