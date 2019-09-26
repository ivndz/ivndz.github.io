

const box = async (roundTime) => {
    let count = 0
    let round = setInterval(function(){
        console.log(count)
        count++
        if (count >= roundTime){
            console.log('ding ding ding')
            clearInterval(round)
        }
              
    },1000)
}



let boxDown = function(roundTime, breakTime, totalRounds, roundsPassed=0) {

    //box() initiolly, followed by box() again to emulate break. 
    box(roundTime).then(()=> {
        setTimeout(function(){
            box(breakTime)
        }, roundTime * 1000)
    }).then(() => {
        //This part executes after a round is complete.
        if (roundsPassed != totalRounds){
            //calcs the time passed 
            let calTimeout = (roundTime + breakTime) * 1000
            calTimeout = calTimeout + 1000

            console.log(`time test time test time test = ${calTimeout}`)
            setTimeout(function(){
                console.log(`we are here`)
                //adds +1 roundsPassed to keep track of the rounds. 
                boxDown(roundTime, breakTime, totalRounds, roundsPassed+1)
            }, calTimeout)
            
        }else{
            setTimeout(function(){
                console.log('the end')
            },((roundTime + breakTime) * 1000)+2000)
            
        }
    })
}



boxDown(5,1,4)

