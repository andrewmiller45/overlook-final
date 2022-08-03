// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import { getData } from './apicalls';
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


let listOfBookings
let listOfCustomers
let listOfRooms

window.addEventListener('load', loadData)

function loadData() {
    Promise.all([getData('customers'), getData('rooms'), getData('bookings')]).then(data => {
        listOfCustomers = data[0].customers
        listOfRooms = data[1].rooms
        listOfBookings = data[2].bookings
        console.log(listOfBookings)
    })
}
