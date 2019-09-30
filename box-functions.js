'use strict'
// eslint-disable-next-line no-unused-vars
const getSavedWorkouts = () => {
    //get the db from localstorage
    const workoutJSON = localStorage.getItem('workouts')
    //try catch per requiements
    try {
        //ternery conditional operator per req
        return workoutJSON !== null ? JSON.parse(workoutJSON) : []
    } catch (e){
        return []
    }

}

// saving workouts to local storage
// eslint-disable-next-line no-unused-vars
const saveWorkouts = (workouts) => {
    //save db and JSON convert the object to string, since 
    //onlu strings can be saved to localstorage
    localStorage.setItem('workouts',JSON.stringify(workouts))
}


const workoutMinutes = (seconds) => {
    //converts counts to minutes 
    let minutes = Math.floor(seconds / 60)
    // get remaning seconds 
    let remainingSecs = seconds - minutes * 60
    //console.log(` This is minutes.${minutes}`)
    //console.log(`this is seconds${remainingSecs}`)
    if (remainingSecs <= 9 ){
        // placed to show timer as 5:00 instead of 5:0        
        remainingSecs = '0'+ remainingSecs
    }
    return `${minutes}:${remainingSecs}`
}

const clearTheTime = (round) => {
    
    document.body.style.backgroundColor = "white"
    document.getElementById("counter").innerHTML = ''
    document.getElementById("minute-header").innerHTML = ''
    document.querySelector('#round-header').innerHTML = ''
    
    return clearInterval(round)

}




let bellAudio = () => { 
    let soundMuted = document.getElementById("mute-sound").checked
    // value of soundMuted while .ckedked will not play sound
    console.log(!soundMuted)
    if(!soundMuted){
        //console.log('Sound');
        document.getElementById("bell-audio").play() 
    }

} 


const box = async (roundTime) => {
    let count = roundTime
    
    let round = setInterval(function () {

        //clear the
        document.querySelector('#clear-workout').addEventListener('click',function(){
            console.log('clicked');
            clearTheTime(round)
            
        })
        
        document.getElementById("minute-header").innerHTML = workoutMinutes(count)
        console.log(count)
        
        //main counter at the center of the page
        document.getElementById("counter").innerHTML = `${count}`
       

            count--
        
         //yellow only shows on round or break times higher than 20 secs
        if (roundTime >= 20 && count === 9){
            document.body.style.backgroundColor = "yellow"
            //console.log('Yellow Flag');
        }

        if (count === 0) {
            document.getElementById("counter").innerHTML = `Ding`
            
            console.log('ding ding ding')
            clearInterval(round)
            bellAudio()
        }

    }, 1000)
}




// eslint-disable-next-line no-unused-vars
let boxCountDown = (roundTime, breakTime, totalRounds, roundsPassed = 0) => {


    document.body.style.backgroundColor = "#39ff14"
    //box() initiolly, followed by box() again to emulate break. 
    box(roundTime).then(() => {
        setTimeout(function () {

            box(breakTime)
            document.body.style.backgroundColor = "red"

        }, roundTime * 1000)
    }).then(() => {
        document.querySelector('#round-header').innerHTML = `Round ${roundsPassed + 1} of ${totalRounds}`
        console.log(` Rounds Passed ${roundsPassed}`);
        //This part executes after a round is complete.
        //total has to less than eq rounds pass to stop. 
        //totalRound -1 offsets the + 1 up top. Now rounds match ends 2of2 and shows 1 of 1 in round 0
        if (roundsPassed < totalRounds -1) {
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
                document.getElementById("minute-header").innerHTML = `End of workout.`
                console.log('the end')
            }, ((roundTime + breakTime) * 1000) + 1000)

        }
    })
}


const renderWorkoutDOM = (workout) => {

 
    // el variables 
    const theWorkout = document.createElement('div')
    const linkWorkout = document.createElement('a')
    //primary workout list
    const workoutEl = document.querySelector('#workouts')
    

    linkWorkout.textContent = `${workout.name} - Round Time/secs: ${workout.roundTime}, Break Time/secs: ${workout.breakTime}, Total Rounds/Sets: ${workout.totalRounds} `
    linkWorkout.setAttribute('href',`/workout.html#${workout.id}`)
    //delete in-line
    workoutEl.appendChild(theWorkout).appendChild(linkWorkout)
    

}


// eslint-disable-next-line no-unused-vars
const renderWorkouts = (workouts,filters) => {
    //function to return filtered selection
     const filteredWorkouts = workouts.filter(function(workout){
     return workout.name.toLowerCase().includes(filters.searchText.toLowerCase())
 })   
    //select and clear the div titled workout
    document.querySelector('#workouts').innerHTML = ''

    //iterate over the workouts 
    filteredWorkouts.forEach(function(workouts){
        renderWorkoutDOM(workouts)
    })
 
}

const removeWorkout = (id) => {
    // findIndex returns the index of the function criteria, workout were id's match
    const workoutIndex = workouts.findIndex(function(workout){
        return workout.id === id
    })

    //if workoutIndex does not find anything it will -1 
    if(workoutIndex > -1){
        //splice deletes workout with a count of 1
        workouts.splice(workoutIndex,1)
    }

}

