import {combineReducers} from 'redux'
import {counter} from './index.redux'
import {login1} from './login.redux'
import {user}  from './redux/user.redux'
import {chatuser}  from './redux/chatuser.redux'
import {chat} from './redux/chat.redux'
export default combineReducers({counter,login1,user,chatuser,chat})
