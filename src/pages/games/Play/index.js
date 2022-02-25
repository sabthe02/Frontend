import './style.scss'
import React, { /* useReducer, */ useContext } from 'react'
import { /* useNavigate, */ Link } from 'react-router-dom'
import { AuthContext } from '../../../App'
/* import { apiUrl } from '../../../utils/api-url'
import { refreshToken } from '../../../utils/refresh-token' */

/* const initialState = {
    nickname: '',
    password: '',
    token: '',
    opponent: '',
    choices: [''],
    opp_choices: [''],
    score: 0,
    result: '',
    finished: false,
    isSending: false,
    hasError: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'GAME_INPUT_CHANGE':
            return {
                ...state,
                [action.payload.input]: action.payload.value
            }
        case 'CREATE_GAME_REQUEST':
            return {
                ...state,
                isSending: true,
                hasError: false
            }
        case 'CREATE_GAME_SUCCESS':
            return {
                ...state,
                isSending: false,
                game: action.payload.game
            }
        case 'CREATE_GAME_FAILURE':
            return {
                ...state,
                isSending: false,
                hasError: true
            }
        default:
            return state
    }

} */

    function Play({ setMyChoice }) {

 /*        const [ state, dispatch ] = useReducer(reducer, initialState) */
        const { state: authState, dispatch: authDispatch } = useContext(AuthContext)
/*         const navigate = useNavigate() */
    
     /*    const handleInput = () => {
            dispatch({
                type: 'CREATE_GAME_REQUEST'
            })
        fetch(apiUrl('/games/'), {
            method: 'POST',
            headers: {
                'Authorization': authState.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: state.nickname,
                password: state.password,
                token: state.token,
                opponent: state.opponent,
                score: state.score,
                opp_score: state.opp_score,
                choices: state.choices,
                opp_choices: state.opp_choices          
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
        }).then(data => {
            dispatch({
                type: 'CREATE_GAME_SUCCESS',
                payload: data
            })

        }).catch(error => {
            console.error('Error en crear game', error)

            if (error.status === 401) {
                refreshToken(
                    authState.refreshToken,
                    authDispatch,
                    navigate,
                    () => handleInput
                )
            } else if (error.status === 403) {
                navigate('/forbidden')
            } else {
                dispatch({
                    type: 'CREATE_GAME_FAILURE'
                })
            }
        }) */

        const setChoice = (e) => {
            setMyChoice(e.target.dataset.id)
          }
         
          return (
            <div className="play">
            <h1>Jugar</h1>
              <div className="items">
                <Link to="/games/game">
                  <div
                    data-id="paper"
                    onClick={setChoice}
                    className="icon icon--paper"
                  ></div>
                </Link>
                <Link to="/games/game">
                  <div
                    data-id="scissors"
                    onClick={setChoice}
                    className="icon icon--scissors"
                  ></div>
                </Link>
                <Link to="/games/game">
                  <div
                    data-id="rock"
                    onClick={setChoice}
                    className="icon icon--rock"
                  ></div>
                </Link>
              </div>
            </div>
          )
        }
   /*  } */
        
export default Play
