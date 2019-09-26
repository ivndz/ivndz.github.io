// eslint-disable-next-line no-unused-vars
const getSavedWorkouts = function (){
    //get the db from localstorage
    const workoutJSON = localStorage.getItem('workouts')
    if (workoutJSON !== null){
        //parse reads string and converts to object
        return JSON.parse(workoutJSON)
    } else {
        //if db is not there return emptry arraw
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


const box = async (roundTime) => {
    let count = 0
    let round = setInterval(function () {
        console.log(count)
        //document.querySelector('#counter').innerHTML(`${count}`)
        count++
        //added getElementbyId to show change on html page
        document.getElementById("counter").innerHTML = `${count}`
        //document.querySelector('#counter').createElement('p').innerHTML(`${count}`)
        //return `${count}`
        if (count >= roundTime) {
            document.getElementById("counter").innerHTML = `Ding Ding Ding`
            console.log('ding ding ding')
            clearInterval(round)
        }

    }, 1000)
}



// eslint-disable-next-line no-unused-vars
let boxCountDown = function (roundTime, breakTime, totalRounds, roundsPassed = 0) {

    //box() initiolly, followed by box() again to emulate break. 
    box(roundTime).then(() => {
        setTimeout(function () {
            box(breakTime)
        }, roundTime * 1000)
    }).then(() => {
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


const renderWorkoutDOM = (workout) => {

    const theWorkout = document.createElement('div')
    const linkWorkout = document.createElement('a')
    //const startButton = document.createElement('button')
    // const workoutStart = document.querySelector(`${workout.id}`)
    // debugger
    // workoutStart.addEventListener('click',function(){
    //     console.log('clocked this');
    //     box(workout.roundTime,workout.breakTime,workout.totalRounds)
    // })
          
    //const editButton = document.createElement('button')

    const workoutEl = document.querySelector('#workouts')
    


    linkWorkout.textContent = `${workout.name} - Round Time/secs: ${workout.roundTime}, Break Time/secs: ${workout.breakTime}, Total Rounds/Sets: ${workout.totalRounds} `
    linkWorkout.setAttribute('href',`/workout.html#${workout.id}`)
    //delete in-line
    workoutEl.appendChild(theWorkout).appendChild(linkWorkout)
    //workoutEl.appendChild(startButton)
    // new line for start
    

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

