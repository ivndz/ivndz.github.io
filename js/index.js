'use strict'

let workouts = getSavedWorkouts()

let filters = {
    searchText: ''
} 



//function to search workouts and input causes the action
document.querySelector('#search-text').addEventListener('input',(e) => {
    //search #search text for words and assign then to e target value
    filters.searchText = e.target.value
    renderWorkouts(workouts,filters)
}
)


//adding workout eventlistener
//submit eventlistener ==> because #add-workout is a form. 
document.querySelector('#add-workout').addEventListener('submit', (e) => {
    
    e.preventDefault() // prevent refresh

    validateName("workout-title", e.target.elements.name)
    validateSeconds("round-time-text", e.target.elements.roundTime)
    validateSeconds("break-time-text", e.target.elements.breakTime)
    validateSeconds("total-rounds-time-text", e.target.elements.totalRounds)


    
    workouts.push({
        // key = e.target.elements.**match to html**
        id: uuidv4(),
        name: `${e.target.elements.name.value}`,
        roundTime: Number(`${e.target.elements.roundTime.value}`),
        breakTime: Number(`${e.target.elements.breakTime.value}`),
        totalRounds: Number(`${e.target.elements.totalRounds.value}`),
    })
    saveWorkouts(workouts)
    
    //reset the form
    e.target.elements.name.value = ''
    e.target.elements.roundTime.value = ''
    e.target.elements.breakTime.value = ''
    e.target.elements.totalRounds.value = ''
    renderWorkouts(workouts,filters)
})




// eslint-disable-next-line no-undef
renderWorkouts(workouts,filters)


//if workouts is not there or its empty show no workout
if (workouts === undefined || workouts.length == 0) {
    let noWorkouts = document.createElement('p')
    noWorkouts.innerText = `No workouts. Create a workout.`
    document.querySelector('#workouts').append(noWorkouts)
}   

//if edit pages makes changes index auto updates. 
window.addEventListener('storage', (e) => {
    if (e.key === 'workouts') {
        workouts = JSON.parse(e.newValue)
        renderWorkouts(workouts,filters)
    }
    
})

