// 
// eslint-disable-next-line no-undef
let workouts = getSavedWorkouts()

let filters = {
    searchText: ''
} 


//function to search workouts and input causes the action
document.querySelector('#search-text').addEventListener('input',function(e){
    //search #search text for words and assign then to e target value
    filters.searchText = e.target.value
    // eslint-disable-next-line no-undef
    renderWorkouts(workouts,filters)
}
)



//adding workout eventlistener
//submit eventlistener ==> because #add-workout is a form. 
document.querySelector('#add-workout').addEventListener('submit', function(e){

    e.preventDefault() // prevent refresh
    workouts.push({
        // key = e.target.elements.**match to html**
        // eslint-disable-next-line no-undef
        id: uuidv4(),
        name: `${e.target.elements.name.value}`,
        roundTime: Number(`${e.target.elements.roundTime.value}`),
        breakTime: Number(`${e.target.elements.breakTime.value}`),
        totalRounds: Number(`${e.target.elements.totalRounds.value}`),
    })
    // eslint-disable-next-line no-undef
    saveWorkouts(workouts)
    
    //reset the form
    e.target.elements.name.value = ''
    e.target.elements.roundTime.value = ''
    e.target.elements.breakTime.value = ''
    e.target.elements.totalRounds.value = ''
    // eslint-disable-next-line no-undef
    renderWorkouts(workouts,filters)
})



console.log(workouts)
console.log(filters)
// eslint-disable-next-line no-undef
renderWorkouts(workouts,filters)

//boxCountDown(workout[1].roundTime,workout[1].breakTime,workout[1].totalRounds)
