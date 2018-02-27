import React from "react"
import {NavBar,InputItem,TextareaItem,Button} from "antd-mobile"
import {connect} from 'react-redux'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import  {update} from '../../redux/user.redux'
import {Redirect} from "react-router-dom";
@connect(
	state=>state.user,
	{update}
	)
class GeniusInfo extends React.Component{
	constructor(props) {
		super(props)
		this.state={
			avatar:'1',
			title:'',
			desc:'',
			type:'genius'
		}
	}
	handleChange(key,val){
		this.setState({[key]:val})
	}

	render(){
		const path=this.props.location.pathname
		const go=this.props.goto
		return (
			<div>
			{this.props.goto&&go!=path?<Redirect to={this.props.goto} ></Redirect>:null}
				<NavBar	mode="dark">牛人完善信息页面</NavBar>
				<AvatarSelector setAvatar={imgname=>{
					this.setState({
						avatar:imgname
					})
				}}></AvatarSelector>
				<InputItem onChange={v=>this.handleChange('title',v)}>求职职位</InputItem>
				<TextareaItem 
					autoHeight 
					title='个人简介' 
					rows={3}
					onChange={v=>this.handleChange('desc',v)}
				></TextareaItem>
				<Button type="primary"onClick={()=>{this.props.update(this.state)}} >保存</Button>
			</div>
			)
	}
}
export  default GeniusInfo