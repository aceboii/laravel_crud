import {createContext, useContext, useState} from 'react'

const StateContext = createContext(
    {
        user: null, 
        token: null,
        notification:null,
        setUser: ()=> {},
        setToken: ()=> {},
        setNotification: () => {}
    }
)

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [notification, _setNotification] = useState('')
    const [token, _setToken] = useState(localStorage.getItem('Access_Token'))

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(()=>{
            _setNotification('')
        }, 5000)
    }

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('Access_Token', token)
        }else{
            localStorage.removeItem('Access_Token')
        }
    }
    return (
        <StateContext.Provider value={{
            user, token, setUser, setToken, notification, setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)