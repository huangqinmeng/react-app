import axios from 'axios'
import io from 'socket.io-client'
const socket=io('ws://localhost:9093')
const MSG_LIST='MSG_LIST'
const MSG_RECV='MSG_RECV'
const MSG_READ='MSG_READ'
const initState={
 	chatmsg:[],
 	users:{},
 	unread:0,

}
export function chat(state=initState,action) {
	switch(action.type){
		case MSG_LIST:
			return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to==action.payload.user).length}
		case MSG_RECV:
			const n=action.payload.to==action.user?1:0
			return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
		case MSG_READ:
			return {...state,chatmsg:state.chatmsg.map(v=>{
				if(v.from==action.payload.from){v.read=true}
				return v
			}),unread:state.unread-action.payload.num}
		default:
			return state
	}
}

function msgList(msgs,users,user){
	return {type:MSG_LIST,payload:{msgs,users,user}}
}
function msgRecv(data,user){
	return {user,type:MSG_RECV,payload:data}
}
function msgRead({from,to,num}){
	return {type:MSG_READ,payload:{from,to,num}}
}




export function sendMsg(from,to,msg){
	console.log('called sendMsg')
	return dispatch=>{
		socket.emit('sendmsg',{from,to,msg})
	}
}
export function readMsg(from){
	return (dispatch,getState)=>{
		axios.post('/user/readmsg',{from})
			.then(res=>{
				const user=getState().user.user
				if(res.status==200&&res.data.code==0){
					dispatch(msgRead({from,user,num:res.data.num}))
				}
			})
	}
}

export function recvMsg(){
	console.log('called recvMsg')
	return (dispatch,getState)=>{
		socket.on('recvmsg',function(data){
			console.log('recvmsg',data)
			const user=getState().user.user
			dispatch(msgRecv(data,user))
		})
	}
}
export function getMsgList() {
	return (dispatch,getState)=>{
		axios.get('/user/getmsglist')
			.then(res=>{
				if(res.status==200&&res.data.code==0){
				const user=getState().user.user
				dispatch(msgList(res.data.msgs,res.data.users,user))
				}
			})
		
	}
}
