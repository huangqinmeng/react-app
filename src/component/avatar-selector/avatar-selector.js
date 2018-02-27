import React from "react"
import {Grid,List} from "antd-mobile"
import PropTypes from "prop-types"
class AvatarSelector extends React.Component{
	static propTypes={
		setAvatar:PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
		this.state={
			avatar:'',
			icon:'',
			text:''
		}
	}
	
	render(){
		const gridHeader=this.state.text?(
		<div >
			<span style={{height:30,display:'inline-block'}}>已选头像: 
				<img src={this.state.icon} style={{width:30}} alt='icon'/>
			</span>
		</div>): <div style={{height:30,verticalAlign:'middle'}}>请选择头像</div>
		let avatarList='1,2,3,4,5,6,7,8,9'
		.split(',')
		.map((v) => ({
			icon:require(`../img/${v}.jpg`),
			text:v
		}))

		return (
			<div>
				<List renderHeader={()=>gridHeader}>
				<Grid 
					data={avatarList}  
					columnNum={3} 
					onClick={(val)=>{
						console.log(val)
						this.setState(val)
						this.props.setAvatar(val.text)
					}} 
				/>
				</List>
				
			</div>
			)
	}
}
export  default AvatarSelector