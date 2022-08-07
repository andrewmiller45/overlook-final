// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import { getData } from './apicalls'
import './css/styles.css'
import Customer from './classes/Customer.js'
import Rooms from './classes/Rooms.js'
import dayjs from 'dayjs'
dayjs().format()

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/hotelroom.png'

// globals
let listOfBookings
let listOfCustomers
let listOfRooms
let customerClass
let roomClass
let managerClass
let currentDate


//q selectors 
let bookingsViewContainer = document.querySelector('.room-card-to-view')
let viewAvailableRoomsContainer = document.querySelector('.room-card-to-book')
// let userHeadlineMsg = document.querySelector('.')
let submitButton = document.querySelector('#submitButton')
let calendarValues = document.getElementById('calDate')
let viewYourBookingsButton = document.querySelector('#bookingsButton')

// e listeners 
window.addEventListener('load', loadData)
submitButton.addEventListener('click', displayAvailableRooms)
viewYourBookingsButton.addEventListener('click', displayUsersBookings)

//functions
function loadData(  ) {
    Promise.all([getData('customers'), getData('rooms'), getData('bookings')]).then(data => {
        listOfCustomers = data[0].customers
        listOfRooms = data[1].rooms
        listOfBookings = data[2].bookings
        customerClass = new Customer(listOfCustomers[ Math.floor( Math.random( ) * listOfCustomers.length ) ])
        roomClass = new Rooms(listOfRooms)
        customerClass.findBookings(listOfBookings)
        customerClass.updateCostPerNight(listOfRooms)
        customerClass.findSpendHistory()
        displayUsersBookings()
    })
}

function displayUsersBookings (  ) {
    hide(viewAvailableRoomsContainer)
    show(bookingsViewContainer)
    bookingsViewContainer.innerHTML = ""
    customerClass.bookings.map((booking => {
        return bookingsViewContainer.innerHTML += 
        `<section class="room-card-to-view">
            <img src="./images/hotelroom.png" class="room-image" alt="room image" >
            <p>Date of Stay: ${booking.date}</p>
            <p>Room ${booking.roomNumber}</p>
            <p>Cost per Night: $${booking.amount}</p>
        </section>`
    }))
}

function displayAvailableRooms(e){
    hide(bookingsViewContainer)
    show(viewAvailableRoomsContainer)
    let reformattedDate = dayjs(calendarValues.value).format("YYYY/MM/DD")
    let availableRooms = roomClass.filterForAvailability(listOfBookings, reformattedDate) 
        console.log(roomClass) 
        viewAvailableRoomsContainer.innerHTML = ""
        availableRooms.map(availableRoom =>  {
            console.log(availableRoom);
            return viewAvailableRoomsContainer.innerHTML +=         
            `<section class="room-card-to-book">
                <img src="./images/hotelroom.png" class="room-image" alt="room image" >
                <p>Room ${availableRoom.number}</p>
                <p>Room Type: ${availableRoom.roomType}</p>
                <p>${availableRoom.bedSize} size bed</p>
                <p>Cost per Night: $${availableRoom.costPerNight}</p>
                <button id="bookItButton">Book this room!</button>
            </section>`
        })
}

function hide(element){
    element.classList.add('hidden')
}

function show(element){
    element.classList.remove('hidden')
}