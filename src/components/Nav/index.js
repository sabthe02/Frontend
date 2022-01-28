import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaHandScissors } from 'react-icons/fa'
import { AuthContext } from '../../App'
import NavLink from '../NavLink'
import { LOGOUT } from '../../action-types'

function BarraNav() {
    const { dispatch } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        dispatch({ type: LOGOUT })
        navigate('/')
    }

    return (
        <>
        <Navbar bg="dark" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Piedra Papel Tijera</Navbar.Brand>
            <FaHandScissors/>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link onClick={logout}>Salir</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        </>


    )
}

export default BarraNav