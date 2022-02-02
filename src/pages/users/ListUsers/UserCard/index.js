import './style.scss'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../../../App'
import { UsersContext } from '../'

function UserCard({ user, game }) {
    const navigate = useNavigate()
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
    const { state: usersState, dispatch: usersDispatch } = useContext(UsersContext)
    
    return (
        <div className="user-card col">
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">Nickname: {user.nickname}</h4>
                </div>

                <div class="btn-group" role="group" aria-label="Basic example">
                    <button
                        type="button"
                        className="btn btn-success"
                            onClick={() => navigate(`/games/${game.id}`)}>
                                iniciar partida
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard