import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WhiteSpace,Button,Radio} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import {connect}  from "react-redux"
import {register} from '../../redux/user.redux'
import {Redirect} from "react-router-dom";
// import utility from 'utility'
@connect(
	state=>state.user,
	{register}
	)
class Register extends React.Component{
	constructor(props){
		super(props)
		this.state={
			user:'',
			pwd:'',
			reqwd:'',
			type:'genius'
		}
		this.handleRegister=this.handleRegister.bind(this)
	}
	handleChange(key,val){
		this.setState({[key]:val})
		console.log(key,this.state[key])
	}
	handleRegister(){
		this.props.register(this.state)
		
	}
	render(){
		const RadioItem=Radio.RadioItem
		return (
			<div>
				{this.props.goto?<Redirect to={this.props.goto} />:null}
				<Logo></Logo>
				<List>
					{this.props.msg?<p>{this.props.msg}</p>:null}
					<InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
					<InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
					<InputItem  type='password' onChange={v=>this.handleChange('repwd',v)}>确认密码</InputItem>
					<WhiteSpace></WhiteSpace>
					<RadioItem  checked={this.state.type==='boss'} onChange={v=>this.handleChange('type','boss')}>BOSS</RadioItem>
					<RadioItem  checked={this.state.type==='genius'} onChange={v=>this.handleChange('type','genius')}>牛人</RadioItem>
					<WhiteSpace></WhiteSpace>
					<WhiteSpace></WhiteSpace>
					<WhiteSpace></WhiteSpace>
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
				</List>
			</div>
		)

		
	}
}

export default Register