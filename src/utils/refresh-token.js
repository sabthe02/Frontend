import { REFRESH_TOKEN } from '../action-types'
import { apiUrl } from './api-url'

export const refreshToken = (token, dispatch, navigate, callback) => {
    fetch(apiUrl('auth/refresh'), {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response
        }
    }).then(response => {
        dispatch({
            type: REFRESH_TOKEN,
            payload: response
        })

        if (callback) {
            callback()
        }
    }).catch(error => {
        console.error(error)

        dispatch({
            type: 'LOGOUT'
        })

        navigate('/login')
    })
}
