'use strict'

let workouts = getSavedWorkouts()

//get the location id from browswer (1) removes #
const workoutId =  location.hash.substring(1)

//checks db for matching id
let workout = workouts.find((workout) => {
    return workout.id === workoutId
})

//if workout id is not found go to main
if (workout === undefined){
    location.assign('/index.html')
}

// var elements
const delEl = document.querySelector("#delete-workout")
const workoutNameEl = document.querySelector('#workout-name')
const workoutRoundTime = document.querySelector('#round-time')
const workoutBreakTime = document.querySelector('#break-time')
const workoutTotalRound = document.querySelector('#total-rounds')


//values for elements
workoutNameEl.value = workout.name
workoutRoundTime.value = workout.roundTime
workoutBreakTime.value = workout.breakTime
workoutTotalRound.value = workout.totalRounds


delEl.addEventListener('click',() => {
          removeWorkout(workoutId)
          saveWorkouts(workouts)
          location.assign('index.html')          

})


workoutNameEl.addEventListener('change',(e) =>{
    workout.name = e.target.value
    validateName("workout-title", e.target)
    saveWorkouts(workouts)
     
})

workoutRoundTime.addEventListener('change',(e) => {
    workout.roundTime = Number(e.target.value)
    validateSeconds("round-time-text", e.target)
    saveWorkouts(workouts)
     
})

workoutBreakTime.addEventListener('change',(e) => {
    workout.breakTime = Number(e.target.value)
    validateSeconds("break-time-text", e.target)
    saveWorkouts(workouts)
     
})

workoutTotalRound.addEventListener('change',(e) => {
    workout.totalRounds = Number(e.target.value)
    validateSeconds("total-rounds-time-text", e.target)
    saveWorkouts(workouts)
})


document.querySelector('#start-workout').addEventListener('click',() => {
    document.getElementById('start-workout').disabled = true
    boxCountDown(workout.roundTime,workout.breakTime,workout.totalRounds)
     
 })


 document.querySelector('#clear-workout').addEventListener('click',() => {
    window.location.reload()
 })



window.addEventListener('storage',(e) => {
    if(e.key === 'workouts'){

        workouts = JSON.parse(e.newValue)
        workout = workouts.find((workout) => {
            return workout.id === workoutId
        })
        
        if (workout === undefined){
            location.assign('/index.html')
        }
        workoutNameEl.value = workout.name
        workoutRoundTime.value = workout.roundTime
        workoutBreakTime.value = workout.breakTime
        workoutTotalRound.value = workout.totalRounds

    }
    
})

