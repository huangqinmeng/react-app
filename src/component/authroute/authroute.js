import React  from "react"
import axios from 'axios'
import {withRouter} from "react-router-dom"
import {loadData,getinfo} from "../../redux/user.redux"
import {connect} from "react-redux"
@withRouter
@connect(
	null,
	{loadData,getinfo}
	)
class AuthRoute extends React.Component {
	// constructor(props) {
	// 	super(props)
	// }
	componentWillMount() {
		const publicList=['/login','/register']
		const pathname=this.props.location.pathname
		if (publicList.indexOf(pathname)!=-1){
			return null
		}
		// axios.get('/user/info')
		// 	.then(res=>{
		// 		if(res.status===200){
		// 			if(res.data.code===0){
		// 				console.log(res.data)
		// 				this.props.loadData(res.data)
		// 			}else{
					
		// 			this.props.history.push('/login')
		// 		}
		// 		}

		// 	})
		this.props.getinfo()
	}
	render(){
		return null
	}
}
export default AuthRoute