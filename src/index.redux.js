const ADD="1"
const DIFF='2'
export function counter(state=0,action) {
  // body...
  switch(action.type){
    case '1':
      return state+1
    case '2':
      return state-1
    default:
      return 100
  }
}
export function addD(){
	return {type:ADD}
}
export function diffD(){
	return {type:DIFF} 
}
export function addDAsy(){
	return dispatch=>{
		setTimeout(() => {
		  dispatch(addD())
		}, 2000)
	}
}