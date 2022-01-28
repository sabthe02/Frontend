import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN } from '../../../action-types'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'

function Login() {
    const { dispatch } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const initialState = {
        nickname: '',
        password: '',
        token: '',
        isSubmitting: false,
        errorMessage: null
    }

    const [data, setData] = React.useState(initialState)

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = () => {
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        fetch(apiUrl('login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: data.nickname,
                password: data.password,
                token: data.token
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            dispatch({
                type: LOGIN,
                payload: data
            })

            navigate('/home')
        }).catch(error => {
            console.error(error)

            setData({
                ...data,
                isSubmitting: false,
                errorMessage: 'Credenciales invalidas'
            })
        })
    }

    return (
        <div className="login-container">
            <div className="card">
                <div className="container">
                    <h1>Inicio de sesión</h1>

                    <label htmlFor="nickname">
                        Nickname
                        <input
                            type="text"
                            value={data.nickname}
                            onChange={handleInputChange}
                            name="nickname"
                            id="nickname"
                        />
                    </label>

                    <label htmlFor="password">
                        Contraseña
                        <input
                            type="password"
                            value={data.password}
                            onChange={handleInputChange}
                            name="password"
                            id="password"
                        />
                    </label>

                    <button onClick={handleFormSubmit} disabled={data.isSubmitting}>
                        {data.isSubmitting ? (
                            "Espere..."
                        ) : (
                            "Ingresar"
                        )}
                    </button>

                    {data.errorMessage && (
                        <span className="form-error">{data.errorMessage}</span>
                    )}

                    <br/>
                    <Link to="/register">Registrarse</Link>
                    <br/>
                    <Link to="/">Volver a landing</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
