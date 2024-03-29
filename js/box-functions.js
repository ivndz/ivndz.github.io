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

    if (remainingSecs <= 9 ){
        // placed to show timer as 5:00 instead of 5:0        
        remainingSecs = '0'+ remainingSecs
    }
    return `${minutes}:${remainingSecs}`
}




let bellAudio = () => { 
    let soundMuted = document.getElementById("mute-sound").checked
    // value of soundMuted while .ckedked will not play sound
    if(!soundMuted){
        document.getElementById("bell-audio").play() 
    }

} 


const box = async (roundTime) => {

    let count = roundTime

    try {

        let round =  await setInterval(() => {

                   
            document.getElementById("minute-header").innerHTML = workoutMinutes(count)
            
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
                
               
                clearInterval(round)
                bellAudio()
            }

        }, 1000)
    } catch (e) {
        return e.message
    }



}


let boxCountDown = async (roundTime, breakTime, totalRounds, roundsPassed = 0) => {
    
    document.body.style.backgroundColor = "#39ff14"

    try {
        if (typeof (roundTime) !== 'number') {
            throw new Error('Please use integer for roundTime.')
        }
         //box() initiolly, followed by box() again to emulate break. 
        await box(roundTime)
        //firest break
        await setTimeout(() => {
            box(breakTime)
            document.body.style.backgroundColor = "red"
        }, roundTime * 1000)

        document.querySelector('#round-header').innerHTML = `Round ${roundsPassed + 1} of ${totalRounds}`
        
        //This part executes after a round is complete.
        if (roundsPassed < totalRounds -1) {
            //calcs the time passed for the next round
            let calTimeout = ((roundTime + breakTime) * 1000) + 1000

             await setTimeout(function () {
                //adds +1 roundsPassed to keep track of the rounds and return a new function with values to start next round 
                boxCountDown(roundTime, breakTime, totalRounds, roundsPassed + 1)
            }, calTimeout)

        } else {
            await setTimeout(function () {
                
                document.getElementById("counter").innerHTML = `Fin.`
                document.getElementById("minute-header").innerHTML = `0:00`
            }, ((roundTime + breakTime) * 1000) + 1000)

        }
    } catch(e) {
        console.log(e.message)
        return e.message
    }
}



const renderWorkoutDOM = (workout) => {

 
    // el variables 
    const theWorkout = document.createElement('div')
    const linkWorkout = document.createElement('a')
    //primary workout list
    const workoutEl = document.querySelector('#workouts')
    

    linkWorkout.textContent = `${workout.name} - Round Time/secs: ${workout.roundTime}, Break Time/secs: ${workout.breakTime}, Total Rounds/Sets: ${workout.totalRounds} `
    linkWorkout.setAttribute('href',`workout.html#${workout.id}`)
    //delete in-line
    workoutEl.appendChild(theWorkout).appendChild(linkWorkout)
    

}


// eslint-disable-next-line no-unused-vars
const renderWorkouts = (workouts,filters) => {
    
    //function to return filtered selection
    const filteredWorkouts = workouts.filter(workout => workout.name.toLowerCase().includes(filters.searchText.toLowerCase())) 

    //select and clear the div titled workout
    document.querySelector('#workouts').innerHTML = ''

    //iterate over the workouts 
    filteredWorkouts.forEach(function(workouts){
        renderWorkoutDOM(workouts)
    })
 
}

const removeWorkout = (id) => {
    // findIndex returns the index of the function criteria, workout were id's match
    const workoutIndex = workouts.findIndex((workout) => {
        return workout.id === id
    })

    //if workoutIndex does not find anything it will -1 
    if(workoutIndex > -1){
        //splice deletes workout with a count of 1
        workouts.splice(workoutIndex,1)
    }

}

const validateSeconds = (elementId,element) => {
    
    //default error message
    const errorValue = 'Error: Please provide time in seconds format ##. Value also has to be greater than 0.'
   
    
    //validate that value is a integer and not blank
    if( element.value == '' || isNaN(element.value) || element.value <= 0 ) {
       
       document.getElementById(elementId).style.color = "red"
       document.getElementById(elementId).innerHTML = errorValue
    
       element.focus() 
    
       throw new Error(errorValue)
   
    }

    //if value  validates refreshes the color and original text back to default. 
    //prevents error from being presistent to the UX.
    document.getElementById(elementId).style.color = "black"

    switch(elementId) {
        case "round-time-text":
            document.getElementById(elementId).innerHTML =  'Round Time: '
            break
        case "break-time-text":
            document.getElementById(elementId).innerHTML = 'Break Time:'
            break
        case "total-rounds-time-text":
             document.getElementById(elementId).innerHTML = 'Total Rounds/Sets: '
    }


}

const validateName = (elementId,element) => {
     
    //default error message
    const errorValue = 'Workout title too short. '
   
 
    //Check length of title
    if( String(element.value.length) <= 2 ) {
       
       document.getElementById(elementId).style.color = "red"
       document.getElementById(elementId).innerHTML = errorValue
    
       element.focus() 
    
       throw new Error(errorValue)
   
    }
    console.log('here')
    //if value  validates refreshes the color and original text back to default. 
    //prevents error from being presistent to the UX.
    document.getElementById(elementId).style.color = "black"
    document.getElementById(elementId).innerHTML = 'Workout Title:'
  
}