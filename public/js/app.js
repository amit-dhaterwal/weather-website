console.log("client sied javaScript is loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=> {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                // console.log(data.weather)
                // console.log(data.place)
                // console.log(data)
                messageOne.textContent = data.place 
                messageTwo.textContent = data.weather
                
            }
        })
    })
    
})