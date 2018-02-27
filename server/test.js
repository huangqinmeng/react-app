const utils=require('utility')
var str='1234567890qwertyuiopasdfghjklzxcvbnm'
// str='qwer'
var words=str.split("")
password=utils.md5('q123')

var now=new Date;
var start=now.getTime();
function fn(count,cpwd) {
	
	
	if (count<1){return false;}
	else{
		cpwd=cpwd?cpwd:" ";
		for(let i in words){
			// console.log("i:",i,count);
			cpwd=cpwd.slice(0,-1)+words[i];
			 // console.log('cpwd:',cpwd)
			if(utils.md5(cpwd.toString())==password){
				var now2=new Date;
				var end=now2.getTime();
				last=end-start
				console.log('suceess pwd=',cpwd,'用时:',last/1000,'秒')
				return cpwd
			}else {

				if(count-1>=1){
					recount=count-1
					recpwd=cpwd+' ';
					return fn(recount,recpwd);

				}
			}
				

		
		}
	}

}
console.log('cpwd:',fn(4))
