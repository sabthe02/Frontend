import './style.scss'
import React from 'react'
import { AuthContext } from '../../App'


function Landing() {
    const { state } = React.useContext(AuthContext)          
    
    return (
        <>
            <main>
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 fw-normal">Piedra Papel Tijera</h1>

                        {state.isAuthenticated ? (
                            <a className="btn btn-outline-secondary" href="home">Ver mis partidas</a>
                        ) : (
                            <a className="btn btn-outline-secondary" href="login">Entrar</a>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Landing