import axios from 'axios'
const LOGIN='LOGIN'
const LOGOUT='LOGOUT'
const USER_DATA='USER_DATA'
export function login1(state={isLogin:false,name:'tim',age:99},action) {
	switch(action.type){
		case LOGIN:
			return {...state,isLogin:true}
		case LOGOUT:
			console.log("logout-action")
			return {...state,isLogin:false}
		case USER_DATA:
			return{...state,...action.load}
		default:
			return state
	}
}
//action
export function getData(){
	return dispatch=>{
		console.log(dispatch)
		axios.get('/test')
			.then(res=>{
				if(res.status===200){
					dispatch(userData(res.data))
				}
			})
	}
}
export function userData(data){
	return {type:USER_DATA,load:data}
}
export function login(){
	return {type:LOGIN}
}
export function logout(){
	console.log("logout")
	return {type:LOGOUT}
}
