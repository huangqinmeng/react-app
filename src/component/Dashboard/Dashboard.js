import React from "react"
import {connect} from "react-redux"
import {NavBar} from 'antd-mobile'
import {Switch,Route,Redirect} from 'react-router-dom'
import NavLinkBar from '../navLinkBar/navLinkBar'
import Boss from '../../component/boss/boss'
import Msg from '../../component/msg/msg'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'
// function Boss(){
// 	return <h2>boss</h2>
// }
// function Genius(){
// 	return <h2>geius</h2>
// }
// function Msg(){
// 	return <h2>Msg</h2>
// }
// class User extends React.Component {

// 		render(){

// 			return <h2>User</h2>
// 		}
		
	

// }
@connect(
	state=>state,
	{getMsgList,recvMsg}

	)
class Dashboard extends React.Component {
	// constructor(props) {
	// }
	componentDidMount() {
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
	}
	// componentWillReceiveProps(nextProps) {
	// 	nextProps.user.user?null:this.props.history.push('/login')
	// }
	render(){
		const {pathname}=this.props.location
		const navList=[
		{
			path:'/boss',
			text:'牛人',
			icon:'boss',
			title:'牛人列表',
			component:Boss,
			hide:this.props.user.type=='genius'

		},
		{
			path:'/genius',
			text:'boss',
			icon:'job',
			title:'BOSS列表',
			component:Genius,
			hide:this.props.user.type=='boss'

		},
		{
			path:'/msg',
			text:'消息',
			icon:'msg',
			title:'消息列表',
			component:Msg,

		},
		{
			path:'/me',
			text:'我',
			icon:'user',
			title:'个人中心',
			component:User,

		}
		]
		const page=navList.find(v=>v.path==pathname)
		return page?(
			<div>
				<NavBar className='fix-header' mode='dark'>{page.title}</NavBar>
					<div>
						<Switch>
							<QueueAnim type='left'>
								<Route key={page.path} path={page.path} component={page.component} ></Route>
							</QueueAnim>
						</Switch>
					</div>
				<NavLinkBar data={navList}  ></NavLinkBar>
			</div>
			
		):<Redirect to='/msg' />

	}

}
export default Dashboard