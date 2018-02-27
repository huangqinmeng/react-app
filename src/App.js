import React, { Component } from 'react';
import './App.css';
// import {createStore} from 'redux'
// import {Button,List} from 'antd-mobile'
import {connect} from 'react-redux'
import 'antd-mobile/dist/antd-mobile.css'
import {addD,addDAsy,diffD} from './index.redux'

// const store=createStore(counter)
// console.log(store.getState())
// function listen(){
//   const c=store.getState()
//   console.log(`changetime${c}`)
// }
// store.subscribe(listen)
// store.dispatch({type:"1"})

@connect(state=>({num:state.counter}),{addD,addDAsy,diffD})
class App extends Component {
  // constructor(props){
  //   super(props)
  //   this.state={
  //     ss:[1,2,3,4]
  //   }
  // }
  // add=()=>{
  //   this.setState({
  //     ss:[...this.state.ss,Math.random()]
  //   })
  // }
  render() {
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">Welcome to TIM</h1>
    //     </header>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.js</code> and save to reload.
    //     </p>
    //   </div>
    // );

    return(
      <div>
        <h1>ss:{this.props.num}</h1>
        <button onClick={this.props.addD}>ss+</button>
        <button onClick={this.props.addDAsy}>++++</button>
      </div>
      )
  }
}


export default App;
