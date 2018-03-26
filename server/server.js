import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import utils from 'utility'
import mongoose from 'mongoose'
import React from 'react'
const DB_URL='mongodb://localhost:27017/react'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(err,db){
	console.log('mongo success')
})

const models={
	user:{
		user:{type:String,require:true},
		pwd:{type:String,require:true},
		type:{type:String,require:true},
		avatar:{type:String},
		desc:{type:String},
		title:{type:String},
		company:{type:String},
		money:{type:String}
	},
	'chat':{
		chatid:{type:String,require:true},
		from:{type:String,require:true},
		to:{type:String,require:true},
		read:{type:Boolean,default:false},
		content:{type:String,require:true,default:''},
		create_time:{type:Number,default:new Date().getTime()}
	}

}
for (let m in models){
	mongoose.model(m,new mongoose.Schema(models[m]))
}
const Chat=mongoose.model('chat')
const User=mongoose.model('user')
// User.remove({},function(err,doc){
// 	console.log('delete')
// })
 

// User.create({
// 	user:'aaa',
// 	age:18
// },function(err,doc){
// 	if(!err){
// 		console.log(doc)
// 	}else{
// 		console.log(err)
// 	}
// })
function App(){
	return <h2>123</h2>
}
console.log(App())
const path =require('path')
const app=express()
const server=require('http').Server(app)
const io =require('socket.io')(server)
io.on('connection',function(socket){
	//console.log('user log')
	socket.on('sendmsg',function(data){
		const {from,to,msg}=data
		const chatid=[from,to].sort().join('_')
		Chat.create({chatid:chatid,from:from,to:to,content:msg},function(err,doc){
			if (!err) {
				console.log(doc)
				io.emit('recvmsg',Object.assign({},doc._doc))
			}
		})
		
		
	})
})
const Router=express.Router()
// app.all('*', function(req, res, next) {  
//     res.header("Access-Control-Allow-Origin", "*");  
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");  
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
//     res.header("X-Powered-By",' 3.2.1')  
//     res.header("Content-Type", "application/json;charset=utf-8");  
//     next();  
// });  
app.use(cookieParser())
app.use(bodyParser.json())//接收post参数
app.use('/user',Router)
//统一前后端地址
app.use('/',express.static(path.resolve('build')))
app.use(function(req,res,next){
	if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
		return next()
	}
	return res.sendFile(path.resolve('build/index.html'))
})
app.get('/data',function(req,res){
	User.find({},function(err,doc){
		res.json(doc)
	})
})
app.get('/',function(req,res){
	res.send('<h2>hello<h2>')
})


server.listen(9093,function(){
	console.log('port at 9093');
})

Router.post('/update',function(req,res){
	const userid=req.cookies.userid
	if(!userid){
		res.json({code:1})
	}
	const body=req.body
	console.log(body)
	User.findByIdAndUpdate(userid,req.body,{new:true},function(err,doc){
		console.log("更新",doc)
		const data=Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})

	
})


Router.get('/info',function(req,res){
	const {userid}=req.cookies 
	if(!userid){
		res.json({code:1})
	}else{
		User.findOne({_id:userid},function(err,doc){
			const data=Object.assign(doc,{pwd:''})
			res.json({code:0,data:data})
		})
		
	}
	
		

})
Router.post('/readmsg',function(req,res){
	const user=req.cookies.user
	const {from}=req.body
	Chat.update({from,to:user},{read:true},{multi:true},function(err,doc){
		console.log(doc)
		if(!err){
			return res.json({code:0,num:doc.nModified})
		}
		return res.json({code:1,msg:'修改失败'})
	})
	console.log(from,user)

})

Router.post('/register',function(req,res){
	//////console.log(req.body)
	const {user,pwd,type}=req.body
	User.findOne({user:user},function(err,doc){
		if(doc){
			return res.json({code:1,msg:'用户名重复'})
		}
	})
	User.create({user,pwd,type},function(err,doc){
		if(err){
			return res.json({code:1,msg:'server 505'})
		}else{
			res.cookie('userid',doc._id)
			res.cookie('user',doc.user)
			return res.json({code:0,register:'success',data:doc})
		}
		
	})
	
})


Router.post('/login',function(req,res){
	const{user,pwd,type}=req.body
	User.findOne({user:user,pwd:pwd},function(err,doc){
		if (doc) {
			res.cookie('userid',doc._id)
			res.cookie('user',doc.user)
			return res.json({code:0,data:doc})
		}else{
			return res.json({code:1,msg:'用户密码错误'})
		}
	})
		

	
})

Router.get('/getmsglist',function(req,res){
	const user=req.cookies.user
	User.find({},function(e,userdoc){
			let users={}
			userdoc.forEach(v=>{
				users[v.user]=v	
			})
			Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
				if(!err){
				//	console.log(users)
					return res.json({code:0,msgs:doc,users:users})
				}
	})

	})

	//{'$or':[{from:user,to:user}]}
	// Chat.find({},function(err,doc){
	// 	if (!err) {
	// 		return res.json({code:0,msgs:doc})
	// 	}
	// })

})
Router.get('/list',function(req,res){
	const {type}=req.query
	//console.log(type)
	User.find({type:type},function(err,doc){
		// console.log('err',err)
		if (!err) {
			return res.json({code:0,data:doc})
		}
	})
	// const bosslist=[
	// 	{
	// 		user:'boss',
	// 		desc:'一年前端经验',
	// 		company:'百度',
	// 		money:'15k',
	// 		avatar:'1'
	// 	},
	// 	{
	// 		user:'boss2',
	// 		desc:'一年前端经验\n熟悉react',
	// 		company:'腾讯',
	// 		money:'18k',
	// 		avatar:'1'
	// 	},
	// 	{
	// 		user:'boss3',
	// 		desc:'一年前端经验\n精通react',
	// 		company:'阿里',
	// 		money:'20k',
	// 		avatar:'3'
	// 	},
	// 	{
	// 		user:'boss4',
	// 		desc:'一年前端经验\n精通html css',
	// 		company:'网易',
	// 		money:'15k',
	// 		avatar:'4'
	// 	},
	// ]
	// const geniuslist=[
	// 	{
	// 		user:'genius',
	// 		avatar:'5',
	// 		title:'前端开发',
	// 		desc:'一年前端经验\n熟悉react',
	// 	},
	// 	{
	// 		user:'genius2',
	// 		avatar:'6',
	// 		title:'前端开发',
	// 		desc:'一年前端经验\n 精通react\n熟悉nodejs',
	// 	},
	// 	{
	// 		user:'genius3',
	// 		avatar:'7',
	// 		title:'资深前端',
	// 		desc:'一年前端经验\n ',
	// 	},
	// 	{
	// 		user:'genius4',
	// 		avatar:'8',
	// 		title:'前端实习',
	// 		desc:'一年项目经验\n ',
	// 	},
	// ]
	// if(type=='genius'){
	// 	return res.json({code:0,data:geniuslist})
	// }
	// else if(type=='boss'){
	// 	return res.json({code:0,data:bosslist})
	// }
})
