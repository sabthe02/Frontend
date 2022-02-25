import './style.scss'
import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { FaHandScissors } from 'react-icons/fa'


function NavWithoutLinks() {

    return (
        <header>
    <>
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Piedra Papel Tijera</Navbar.Brand>
                <FaHandScissors />
            </Container>
        </Navbar>
    </>
    </header>
)
}

export default NavWithoutLinks