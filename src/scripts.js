// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import { getData } from './apicalls';
import './css/styles.css';
import Customer from './classes/Customer.js';
import Rooms from './classes/Rooms.js'; 

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/hotelroom.png'

// globals
let listOfBookings
let listOfCustomers
let listOfRooms
let customerClass
let roomClass
let managerClass

// e listeners 
window.addEventListener('load', loadData)


//q selectors 
let roomContainer = document.querySelector('.room-container')
let userHeadlineMsg = document.querySelector('.')

//functions
function loadData(  ) {
    Promise.all([getData('customers'), getData('rooms'), getData('bookings')]).then(data => {
        listOfCustomers = data[0].customers
        listOfRooms = data[1].rooms
        listOfBookings = data[2].bookings
        console.log(data)
        customerClass = new Customer(listOfCustomers[ Math.floor( Math.random( ) * listOfCustomers.length ) ])
        customerClass.findBookings(listOfBookings)
        customerClass.updateCostPerNight(listOfRooms)
        customerClass.findSpendHistory()
        displayUsersBookings()
    })
}

function displayUsersBookings (  ) {

    roomContainer.innerHTML = ""
    customerClass.bookings.map((booking => {
        console.log(booking);
        return roomContainer.innerHTML += 
        `<section class="room-card-to-view">
            <img src="./images/hotelroom.png" class="room-image" alt="room image" >
            <p>Date of Stay: ${booking.date}</p>
            <p>Room ${booking.roomNumber}</p>
            <p>Cost per Night: $${booking.amount}</p>
        </section>`
    }))
}
