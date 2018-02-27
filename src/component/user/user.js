import React from "react"
import {Result,List,WhiteSpace,Modal} from "antd-mobile"
import {connect} from 'react-redux'
import browserCookie from 'browser-cookies' 
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router'
@connect(
	state=>state.user,
	{logoutSubmit}
	)
class User extends React.Component {
	constructor(props) {
		super(props)
		this.logout=this.logout.bind(this)
	}	
	logout(){
		const alert=Modal.alert
		alert('Delete', 'Are you sure???', [
			{ text: 'Cancel', onPress: () => console.log('cancel') },
			{ text: 'Ok', onPress: () => {
				 browserCookie.erase('userid') 
				this.props.logoutSubmit()
			}},
			])
		// browserCookie.erase('userid')
	}
	render(){
		console.log(this.props.user)
		return this.props.user?(
			<div>

				<Result 
					img={<img src={require(`../img/${this.props.avatar}.jpg`)} alt="avatar" style={{width:50,height:50}} />} 
					title={this.props.user}
					message={this.props.type=='boss'?this.props.company:null}
				/>
				<List>
					<List.Item>
						{this.props.title}
						{this.props.desc.split('\n').map(v=>(<List.Item.Brief key={v}>{v}</List.Item.Brief>))}
						{this.props.money?this.props.money:null}
					</List.Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<List.Item onClick={this.logout}>退出登录</List.Item>
				</List>
			</div>
			):<Redirect to={this.props.goto} />
	}
}
export default User