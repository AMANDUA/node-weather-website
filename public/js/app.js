console.log("client side js loaded!")

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')

const messagePOne = document.querySelector('#message-1')
const messagePTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const location = search.value

    fetch('/weather?address=' + location ).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            // console.log(data.error)
            messagePOne.textContent = data.error
        } else {
            messagePTwo.textContent = data.forecast + '\n' + data.location
        }
    })
})

})