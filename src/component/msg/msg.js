import React from "react"
import {connect} from "react-redux"
import {List,Badge} from 'antd-mobile'
import {Redirect} from 'react-router'
@connect(
	state=>state
	)
class Msg extends React.Component {
	constructor(props) {
		super(props)
	}	
	componentDidMount() {
		//console.log(this.props)
	}
	getLast(arr){
		return arr[arr.length-1]
	}
	render(){
		const Brief=List.Item.Brief
		const msgGroup={}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid]=msgGroup[v.chatid]||[]
			msgGroup[v.chatid].push(v)
		})
		const chatList=Object.values(msgGroup).sort((a,b)=>{
			return this.getLast(b).create_time-this.getLast(a).create_time
		})
		console.log(chatList)
		return (
			<div>
				<List>				
						{chatList.map(v=>{
							const lastItem=this.getLast(v)
							const fromName=v[0].from==this.props.user.user?v[0].to:v[0].from
							const unreadNum=v.filter(v=>!v.read&&v.to==this.props.user.user).length
							console.log(unreadNum)
							const avatar=this.props.chat.users[fromName]&&this.props.chat.users[fromName].hasOwnProperty("avatar")?this.props.chat.users[fromName].avatar:2
							return <List.Item 
								extra={<Badge text={unreadNum}></Badge>}
								key={lastItem._id}
								thumb={require(`../img/${avatar}.jpg`)}
								arrow='horizontal'
								onClick={()=>{
									this.props.history.push(`/chat/${fromName}`)
								}}
							>
								{lastItem.content}
								<Brief>用户名:{fromName}</Brief>
								
							</List.Item>
							})}
					
				</List>			
			</div>
			)
	}
}
export default Msg