import './style.scss'
import React from 'react'
import { FaHandScissors } from 'react-icons/fa'
import { AuthContext } from '../../App'

function Landing() {
    const { state } = React.useContext(AuthContext)

    return (
        <div>
            <header className="site-header sticky-top py-1">
                <nav className="container d-flex flex-column flex-md-row justify-content-between">
                    <div className="py-2">
                        Piedra-Papel-Tijera <FaHandScissors />
                    </div>
                </nav>
            </header>

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

            <footer className="container py-5">
                <div className="row">
                    <div className="col">
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landing