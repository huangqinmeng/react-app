import React from "react"
import axios from "axios"
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'

@connect(
	state=>state.chatuser,
	{getUserList}
	)
class Boss extends React.Component {
	// constructor(props) {
	// 	super(props)
	// 	this.state={
	// 		data:[]
	// 	}
	// }
	componentDidMount() {
		this.props.getUserList('genius')
	}
	handleCLick(v){
		this.props.history.push(`/chat/${v.user}`)
	}
	render(){

			return (
				<WingBlank>
					{
						this.props.userlist.map(v=>(
							v.avatar?
							<Card 
								key={v.user}
								onClick={()=>this.handleCLick(v)}
								>
								<Card.Header
									title={v.user}
									thumb={require(`../img/${v.avatar}.jpg`)}
									extra={<span>{v.title}</span>}
								>	
								</Card.Header>
								<Card.Body>
									{v.desc?v.desc.split('\n').map(v=>(
										<div className='desc-item' key={v}>{v}</div>	
									)):null}
								</Card.Body>								
							</Card>:null
						))
					}
				</WingBlank>
				)
		}



}
export default Boss