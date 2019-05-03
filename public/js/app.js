console.log('Client side javascript')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// }) 


const weatherForm = document.querySelector('form')
const searchForm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent='From Javascript'


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchForm.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch ('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= data.error
            messageTwo.textContent=''
        }
        else{
            messageOne.textContent='Location : ' + data.location
            messageTwo.textContent= "Today's weather : "+data.forecast
        }
    })
})


    console.log(location)

})