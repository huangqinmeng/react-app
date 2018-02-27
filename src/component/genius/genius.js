import React from "react"
import axios from "axios"
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
@connect(
	state=>state.chatuser,
	{getUserList}
	)
class Genius extends React.Component {
	// constructor(props) {
	// 	super(props)
	// 	this.state={
	// 		data:[]
	// 	}
	// }
	componentDidMount() {
		this.props.getUserList('boss')
	}
	handleCLick(v){
		this.props.history.push(`/chat/${v.user}`)
	}
	render(){
			console.log(this.props.userlist)
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
									{<div>公司:{v.company}</div>}
									{v.desc?v.desc.split('\n').map(d=>(
										<div className='desc-item' key={d}>{d}</div>

									)):null}
									{<div>薪资:{v.money}</div>}
								</Card.Body>								
							</Card>:null
						))
					}
				</WingBlank>
				)
		}



}
export default Genius