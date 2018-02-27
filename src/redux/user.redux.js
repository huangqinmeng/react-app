import axios from 'axios'
import {getGotoUrl} from "../util"
import utility from 'utility'
// const REGISTER_SUCCESS='REGISTER_SUCCESS'
// const LOGIN_SUCCESS='LOGIN_SUCCESS'
const AUTH_SUCCESS='AUTH_SUCCESS'
const  ERROR_MSG='ERROR_MSG'
const LOAD_DATA='LOAD_DATA'
const LOG_OUT='LOG_OUT'
const initState={
	avatar:'',
	goto:'',
	msg:'',
	user:'',
	type:'',
	desc:'',
	title:''
}
//reducer
export function user(state=initState,action) {
	console.log(action.payload)
	switch(action.type){
		case AUTH_SUCCESS:
			return {...state,goto:getGotoUrl(action.payload),...action.payload}
		case LOAD_DATA:
			return {...state,...action.payload}
		case ERROR_MSG:
			return {...state,msg:action.msg}
		case LOG_OUT:
			return {...initState,goto:'/login'}
		default:
			return state
	}
}
//action
// function registerSuccess(data){
// 	return {type:REGISTER_SUCCESS,payload:data}
// }
// function loginSuccess(data){
// 	return {type:LOGIN_SUCCESS,payload:data}
// }


function authSuccess(obj) {
	return {type:AUTH_SUCCESS,payload:obj}

}
function errorMsg(msg){
	return {msg, type:ERROR_MSG}
}
 export function loadData(uesrinfo){
 	return {type:LOAD_DATA,payload:uesrinfo.data}
}
export function register({user,pwd,repwd,type}) {
	if(!user||!pwd||!type){
		return errorMsg('用户名密码必须输入')
	}
	if(pwd!==repwd){
		return errorMsg('密码和确认密码不同')
	}
	return dispatch=>{
		axios.post('/user/register',{user,pwd:utility.md5(pwd),type})
			.then(res=>{
				if(res.status===200&&res.data.code===0){
					dispatch(authSuccess({user,type}))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}
export function login({user,pwd}){
	if(!user||!pwd){return errorMsg('请输入用户名或密码')}
	return dispatch=>{
		axios.post('/user/login',{user,pwd:utility.md5(pwd)})
		.then(res=>{
			console.log(res.data)
			if(res.status===200&&res.data.code===0){
				dispatch(authSuccess(res.data.data))
			}else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	} 


	
}
export function update(data) {
	return dispatch=>{
		axios.post('/user/update',data)
			.then(res=>{
				console.log(res.data.code)
				if(res.status===200&&res.data.code===0){
					console.log(res.data)
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function logoutSubmit() {
	return {type:LOG_OUT}
}

export function getinfo(){
	return dispatch=>{
		axios.get('/user/info')
			.then(res=>{
				if(res.status===200){
					if(res.data.code===0){
						dispatch(loadData(res.data))
					}else{
					
					dispatch(logoutSubmit())
				}
				}

		})
	}
	
}