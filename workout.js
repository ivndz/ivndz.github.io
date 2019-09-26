let workouts = getSavedWorkouts()

//get the location id from browswer (1) removes #
const workoutId =  location.hash.substring(1)

//checks db for matching id
let workout = workouts.find(function(workout){
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

//
// const workoutStart = document.querySelector(`${workout.id}`)
// workoutStart.addEventListener('click',function(){
//     console.log('clocked this');
//     box(workout.roundTime,workout.breakTime,workout.totalRounds)
// })



delEl.addEventListener('click',function(){
          removeWorkout(workoutId)
          saveWorkouts(workouts)
          location.assign('index.html')          

})



workoutNameEl.addEventListener('change',function(e){
    workout.name = e.target.value
    saveWorkouts(workouts)
     
})

workoutRoundTime.addEventListener('change',function(e){
    workout.roundTime = e.target.value
    saveWorkouts(workouts)
     
})

workoutBreakTime.addEventListener('change',function(e){
    workout.breakTime = e.target.value
    saveWorkouts(workouts)
     
})

workoutTotalRound.addEventListener('change',function(e){
    workout.totalRounds = e.target.value
    saveWorkouts(workouts)
})


document.querySelector('#start-workout').addEventListener('click',function(){
    // eslint-disable-next-line no-undef
    console.log(typeof(workout.roundTime))
    //boxCountDown(15,5,3)
    //boxCountDown(15,5,10)

    boxCountDown(workout.roundTime,workout.breakTime,workout.totalRounds)
     
 })



window.addEventListener('storage',function(e){
    //console.log('some data change');
    if(e.key === 'workouts'){

        workouts = JSON.parse(e.newValue)
        workout = workouts.find(function(workout){
            return workout.id === workoutId
        })
        
        if (workout === undefined){
            location.assign('/index.html')
        }
        console.log(workout.name);
        document.querySelector('#workout-name').value = workout.name
        //document.querySelector('#').value = workout
    }
    
})