import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import {connect} from "react-redux"
import {login } from '../../redux/user.redux'
import {Redirect} from "react-router-dom";

function WrapHello(Comp){
	class WrapComp extends Comp {
		componentDidMount() {
			console.log('hello2')
		}
		render(){
			return(
				<div>
					<Comp></Comp>
					<h2>im hello2</h2>
				</div>
				)
		}
	}
	return WrapComp
}

@WrapHello
class Hello extends React.Component{
	componentDidMount() {
		console.log('hello is complete')
	}
	render() {
		return (
			<h2>hello</h2>
		)
	}
}

@connect(
	state=>state.user,
	{login}
	)
class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user:'',
			pwd:''
		}
		this.register=this.register.bind(this)
		this.handleLogin=this.handleLogin.bind(this)
	}
	register(){
		console.log(this.props.history)
		this.props.history.push('/register')
	}
	handleChange(key,val){
		this.setState({[key]:val},
			()=>console.log(val))
	}
	handleLogin(){
		this.props.login(this.state)
	}
	render(){
		return (
			<div>
				{this.props.goto?<Redirect to={this.props.goto} />:null}
				<Logo></Logo>
				<h2>登录</h2>
				<WingBlank>
					{this.props.msg?<p>{this.props.msg}</p>:null}
					<List>

						<InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
						<InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
					</List>
					<WhiteSpace/>
					<WhiteSpace/>
					<Button type='primary' onClick={this.handleLogin}>登录</Button>
					<WhiteSpace/>
					<Button type='primary'onClick={this.register} >注册</Button>
				</WingBlank>
			</div>			
			)
	}
}

export default Login