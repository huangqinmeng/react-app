import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import{login,getData}from './login.redux'
// import axios from 'axios'
@connect(
	state=>state.login1,
	{login,getData}
	)
class Login extends React.Component{
	// constructor(props){
	// 	super(props)
	// 	this.state={
	// 		data:{}
	// 	}
	// }
	componentDidMount() {
		console.log("did",this.props)
		 this.props.getData()

	}
	render(){
		return (
			<div>
				{this.props.isLogin?<Redirect to='/board'/>:null}
				<h3>Your Name:{this.props.name}</h3>
				<h3>Your Age:{this.props.age}</h3>
				<h3>你没有权限，登录才能看asd</h3>
				<button onClick={this.props.login}>登录</button>
			</div>
			)
		
	}
}
export default Login