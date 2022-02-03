import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { LOGIN } from '../../../action-types'
import { AuthContext } from '../../../App'
import { apiUrl } from '../../../utils/api-url'

function Register() {
    const { dispatch } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const initialState = {
        nickname: '',
        password: '',
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

        fetch(apiUrl('register'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: data.nickname,
                password: data.password
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
            <div className="container">
                    <h1>Registro de cuenta nueva</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nickname:</Form.Label>
                    <Form.Control type="text"
                            value={data.nickname}
                            onChange={handleInputChange}
                            name="nickname"
                            id="nickname" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                            value={data.password}
                            onChange={handleInputChange}
                            name="password"
                            id="password" />
                </Form.Group>
                <Button variant="primary" onClick={handleFormSubmit} disabled={data.isSubmitting}>
                        {data.isSubmitting ? (
                            "Espere..."
                        ) : (
                            "Ingresar"
                        )}
                </Button>
                {data.errorMessage && (
                        <span className="form-error">{data.errorMessage}</span>
                    )}

                    <br/>
                    <Link to="/login">Iniciar sesión</Link>
                    <br/>
                    <Link to="/">Volver a landing</Link>
                </Form>
                </div>
            </div>
    )
}

export default Register
