import { useReducer } from "react"
import { createContext} from "react"

const initialValue = {
    blogs : [],
    userActive : window.localStorage.getItem('useruid'),
    alert : 'Info',
    alertClass : ''
}
export const Context = createContext('')
const reducer = (state = initialValue, action)=>{
    const {type,payload} = action
    switch (type) {
        case 'GET_BLOG':
            return {...state,blogs : payload}
            break;
        case 'SET_ALERT' :
            return {...state, alert: payload}
            break ;
        case 'SET_ALERT_CLASS' :
            return {...state, alertClass: payload}
            break ;
        case 'SET_USER_ACTIVE' :
            return {...state, userActive: payload}
            break ;
        default:
            return state
            break;
    }
}

const Provider = ({children})=> {
    const [state,dispatch] = useReducer(reducer,initialValue)
    return <Context.Provider value={{state,dispatch}}>{children}</Context.Provider>
}
export default Provider


