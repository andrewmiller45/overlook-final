export let getData = (dataType) => {
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
        .then(response => response.json())
        .catch(error => console.log(error)) //add error handling later
}

export let postData = (data) => {
    return fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if(!response.ok){
                throw new Error('We are experiencing issues with your booking request.')
            } else {
                return response.json
            }
        })
    .catch(error => console.log(error))
}