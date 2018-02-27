import React from 'react'
import PropTypes from 'prop-types'
function Test(props,context){
	console.log(context)
	return(
		<div>
			{context.user}1122
		</div>
		)
}
// class Test extends React.Component{
// 	// static contextTypes={
// 	// 	user:PropTypes.string
// 	// }
// 	render(){
// 		return(
// 			<div>
// 				{this.context.user}1122
// 			</div>
// 			)
// 	}
// }

class Page extends React.Component{
	static childContextTypes={
		user:PropTypes.string
	}
	constructor(props){
		super(props)
		this.state={user:'woniu'}
	}
	getChildContext(){
		return this.state
	}
	render(){
		return (
			<div>
				{this.state.user}123
			<Test/>
			</div>)
	}
}export default Page