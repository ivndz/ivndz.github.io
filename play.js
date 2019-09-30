'use strict'


const box = async (roundTime) => {
    let count = roundTime

    let round = setInterval(function () {
        console.log(count)
        //document.querySelector('#counter').innerHTML(`${count}`)
        count--
         
        if (count == 10){
            console.log('Yellow Flag');
        }

        if (count == 0) {
          //  document.getElementById("counter").innerHTML = `Ding Ding Ding`
            console.log('ding ding ding')
            clearInterval(round)
        }

    }, 1000)
}

// eslint-disable-next-line no-unused-vars
let boxCountDown = function (roundTime, breakTime, totalRounds, roundsPassed = 0) {
    document.body.style.backgroundColor = "#39ff14"
    //box() initiolly, followed by box() again to emulate break. 
    box(roundTime).then(() => {
        setTimeout(function () {
            box(breakTime)
            document.body.style.backgroundColor = "red"
        }, roundTime * 1000)
    }).then(() => {
        document.querySelector('#round-header').innerHTML = `Round ${roundsPassed} of ${totalRounds}`
        console.log(` Rounds Passed ${roundsPassed}`);
        //This part executes after a round is complete.
        if (roundsPassed != totalRounds) {
            //calcs the time passed 
            let calTimeout = (roundTime + breakTime) * 1000
            calTimeout = calTimeout + 1000

            console.log(`time test time test time test = ${calTimeout}`)
            setTimeout(function () {
                console.log(`we are here`)
                //adds +1 roundsPassed to keep track of the rounds and return a new function with values to start next round 
                boxCountDown(roundTime, breakTime, totalRounds, roundsPassed + 1)
            }, calTimeout)

        } else {
            setTimeout(function () {
                //document.getElementById("counter").innerHTML = `End of workout.`
                console.log('the end')
            }, ((roundTime + breakTime) * 1000) + 2000)

        }
    })
}



console.log(boxCountDown(15))