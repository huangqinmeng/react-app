import React from 'react'
import {Route,Link,Redirect} from 'react-router-dom'
import App from './App'
// import login1 from './login.redux' 
import {connect} from 'react-redux'
import {logout} from './login.redux'
function Test2(){
	return <h2>test2</h2>
}
function Test3(){
	return <h2>test3</h2>
}
// function Def(){
// 	return <h1>404</h1>
// }
@connect(
	state=>state.login1,
	{logout}
	)
class Board extends React.Component{
	// constructor(props){
	// 	super(props);
	// }
	render(){
		console.log(this.props.match)
		const url=this.props.match.url
		const red=<Redirect to='/login'></Redirect>
		const app= (
			<div>
				{this.props.isLogin?<button onClick={this.props.logout}>注销</button>:null}
				<ul>
					<li>
						<Link to={`${url}/`}>test1</Link>
					</li>
					<li>
						<Link to={`${url}/er`}>test2</Link>
					</li>
					<li>
						<Link to={`${url}/san`}>test3</Link>
					</li>
				</ul>
				<Route path='/board/' exact component={App}></Route>
				<Route path='/board/er' exact component={Test2}></Route>
				<Route path='/board/san' exact component={Test3}></Route>
			</div>
			)
		return this.props.isLogin?app:red
	}
}
export default Board