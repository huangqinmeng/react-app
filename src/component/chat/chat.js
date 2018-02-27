import React from "react"
import io from 'socket.io-client'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'
const socket=io('ws://localhost:9093')
@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg,readMsg}
	)
class Chat extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			text:'',
			msg:[],
			to:'',
			showEmoji:false
		}
	}
	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
			console.log('我被调用了')
		}
		const to=this.props.match.params.user
		this.props.readMsg(to)

	}	
	componentWillUnmount(){
		const to=this.props.match.params.user
		this.props.readMsg(to)	
	}
	fixB(){
		setTimeout(()=>{
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	handleSubmit(){
		// socket.emit('sendmsg',{text:this.state.text,from:this.props.user})

		const _from=this.props.user.user
		const msg=this.state.text
		const to=this.props.match.params.user
		this.props.sendMsg(_from,to,msg)
		this.setState({
			text:'' ,
			showEmoji:false
		})
		
	}
	render(){
		const user=this.props.match.params.user
		const selfUser=this.props.user.user
		const Item=List.Item
		const users=this.props.chat.users
		if (!users[user]) {
			return null
		}
		const emoji='😀 😁 😂 🤣 😃 😅 😆 😉 😉'
						.split(' ')
						.filter(v=>v)
						.map(v=>({text:v}))
		return (
		<div>
			<div id='chat-page'>	
				<NavBar 
					mode='dark'
					icon={<Icon type="left" />}
					onLeftClick={()=>{
						this.props.history.goBack()
					}} 
					>
					{this.props.match.params.user}
				</NavBar>
				<QueueAnim type="left">
				{this.props.chat.chatmsg.map((v,index)=>{
					var avatar
					if(users[v.from]&&users[v.from].avatar){avatar=require(`../img/${users[v.from].avatar}.jpg`)}
					else{avatar=require('../img/1.jpg')}
					if(v.from==user&&v.to==selfUser){
						return (
								<List key={v._id}>
									<Item
										thumb={avatar}
									>
										{v.content}
									</Item>
								</List>
						)
					}
					else if(v.to==user&&v.from==selfUser){
						return(
								<List key={v._id}>
									<Item 
										extra={<img src={avatar} alt="head"/>}
										className='chat-me' 
										>{v.content}
									</Item>
								</List>
						)
					
					}
					else{
						return null
					}
					})}
				</QueueAnim>

			</div>
			<div className="stick-footer">
				<List>
					<InputItem 
					placeholder='请输入'
					value={this.state.text}
					onChange={v=>{
						this.setState({
							text:v 
						})
					}}
					extra={
						<div>
							<span
								style={{marginRight:15}}
								onClick={()=>{this.setState({
									showEmoji:!this.state.showEmoji 
										})
									this.fixB()
									}

								}
							>😉</span>
							<span onClick={()=>this.handleSubmit()}>发送</span>
						</div>
					}
					>
					
					</InputItem>
				</List>
				{this.state.showEmoji?
					<Grid
						data={emoji}
						columnNum={4}
						carouselMaxRow={2}
						isCarousel = {true}
						onClick={el=>{
							this.setState({
								text:this.state.text+el.text
							})
						}}
					/>:null
				}		
			</div>
		</div>
			)
	}
}
export default Chat