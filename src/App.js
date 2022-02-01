import './App.scss'
import React, { createContext, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Landing from './pages/Landing'
import Home from './pages/Home'
import ListUsers from './pages/users/ListUsers'
import CreateGame from './pages/games/CreateGame'
import ViewGame from './pages/games/ViewGame'
import Login from './pages/security/Login'
import Register from './pages/security/Register'
import NotFound from './pages/access/NotFound'
import BarraNav from './components/Nav'
import NavWithoutLinks from './components/Nav-without-links/'
import Loader from './components/Loader'
import {HIDE_LOADER, LOGIN, LOGOUT, REFRESH_TOKEN, SHOW_LOADER } from './action-types'

export const AuthContext = createContext()

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    showingLoader: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('token', action.payload.user.token)
            localStorage.setItem('refreshToken', action.payload.user.refreshToken)
            
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.user.token,
                refreshToken: action.payload.user.refreshToken
            }
        case REFRESH_TOKEN:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('refreshToken', action.payload.refreshToken)

            return {
                ...state,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken
            }
        case LOGOUT:
            localStorage.clear()

            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                refreshToken: null
            }

        case SHOW_LOADER:
            return {
                ...state,
                showingLoader: true,
            }
        case HIDE_LOADER:
            return {
                ...state,
                showingLoader: false,
            }
        default:
            return state
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <div className="App">
                <Routes>
                    <Route path="/home" element={
                        <RequireAuth>
                            <BarraNav />
                            <Home />
                        </RequireAuth>
                    } />

                  <Route path="/users" element={
                        <RequireAuth>
                            <BarraNav />
                            <ListUsers />
                        </RequireAuth>
                    } />
                    <Route path="/games/:id" element={
                        <RequireAuth>
                            <BarraNav />
                            <ViewGame />
                        </RequireAuth>
                    } />

                    <Route path="/games/create" element={
                        <RequireAuth>
                            <BarraNav />
                            <CreateGame />
                        </RequireAuth>
                    } />

                    <Route path="/login" element={
                        <>
                            <NavWithoutLinks />
                            <Login />
                        </>
                    } />

                    <Route path="/register" element={
                         <>
                         <NavWithoutLinks />
                         <Register />
                     </>
                    } />

                    <Route path="/" element={
                        <>
                        <NavWithoutLinks />
                        <Landing />
                        </>
                    } />

                    <Route path="*" element={
                        <NotFound />
                    } />
                </Routes>

                {state.showingLoader && (
                    <Loader />
                )}
            </div>
        </AuthContext.Provider>
    )
}

export default App
