// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import { getData, postData } from './apicalls'
import './css/styles.css'
import Customer from './classes/Customer.js'
import Booking from './classes/Booking.js'
import Rooms from './classes/Rooms.js'
import dayjs from 'dayjs'
dayjs().format()

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/hotelroom.png'

// globals
let listOfBookings
let booking
let listOfCustomers
let listOfRooms
let customerClass
let roomClass
let currentDate
let dataToPost

//q selectors 
let bookingsViewContainer = document.querySelector('.room-card-to-view')
let viewAvailableRoomsContainer = document.querySelector('.room-card-to-book')
let submitButton = document.querySelector('#submitButton')
let calendarValues = document.getElementById('calDate')
let viewYourBookingsButton = document.querySelector('#bookingsButton')
let roomToBookContainer = document.querySelector('.room-card-to-book')
let roomType = document.querySelector('#roomType')
let header = document.querySelector('header')
let navBar = document.querySelector('nav')

// e listeners 
window.addEventListener('load', loadData)
submitButton.addEventListener('click', displayAvailableRooms)
viewYourBookingsButton.addEventListener('click', displayUsersBookings)
roomToBookContainer.addEventListener('click', (e) => {
    if(e.target.classList == 'book-room'){
        e.target.closest('section').remove()
        window.alert(`Thank you! Your booking has been completed.`)
        getFormDataForPost(e)
        submitPostData(e)
        console.log(customerClass);
    }    
})

//functions
function loadData(  ) {
    Promise.all([getData('customers'), getData('rooms'), getData('bookings')]).then(data => {
        listOfCustomers = data[0].customers
        listOfRooms = data[1].rooms
        listOfBookings = data[2].bookings
        customerClass = new Customer(listOfCustomers[2])
        // customerClass = new Customer(listOfCustomers[ Math.floor( Math.random( ) * listOfCustomers.length ) ])
        console.log(listOfBookings);
        roomClass = new Rooms(listOfRooms)
        customerClass.findBookings(listOfBookings)
        customerClass.updateCostPerNight(listOfRooms)
        customerClass.findSpendHistory()
        displayUsersBookings()
        getCurrentDate()
        console.log(customerClass);
    })
}

function displayUsersBookings () {
    hide(viewAvailableRoomsContainer)
    show(bookingsViewContainer)
    bookingsViewContainer.innerHTML = ""
    customerClass.bookings.map((booking => {
        return bookingsViewContainer.innerHTML += 
        `<section class="individuals-booked-room-card">
            <img src="./images/hotelroom.png" class="room-image" alt="room image" >
            <p>Date of Stay: ${dayjs(booking.date).format("MMMM DD, YYYY")}</p>
            <p>Room ${booking.roomNumber}</p>
            <p>Cost per Night: $${booking.amount}</p>
        </section>`
    }))
}

function displayAvailableRooms(e){
    e.preventDefault()
    hide(bookingsViewContainer)
    show(viewAvailableRoomsContainer)
    let reformattedDate = dayjs(calendarValues.value).format("YYYY/MM/DD")
    let availableRooms = roomClass.filterForAvailability(listOfBookings, reformattedDate, roomType.value) 
    console.log(availableRooms);
        viewAvailableRoomsContainer.innerHTML = ""
        if (!availableRooms.length) {
            window.alert(`The Rio Agressively apologizes, but no rooms are available, returning to your booking page now.`)
            displayUsersBookings()
        } else {
            availableRooms.map(availableRoom =>  {
                return viewAvailableRoomsContainer.innerHTML +=         
                `<section class="individuals-available-room-card">
                    <img src="./images/hotelroom.png" class="room-image" alt="room image" >
                    <p>Room ${availableRoom.number}</p>
                    <p>Room Type: ${availableRoom.roomType}</p>
                    <p>${availableRoom.bedSize} size bed</p>
                    <p>Cost per Night: $${availableRoom.costPerNight}</p>
                    <button class="book-room" id="${availableRoom.number}">Book this room!</button>
                </section>`          
        })
    }
}

function getCurrentDate() {
    currentDate = new Date()
    currentDate = dayjs(currentDate).format("YYYY-MM-DD")
    calendarValues.min = currentDate
    calendarValues.value = currentDate
}

function getFormDataForPost(e) { 
    dataToPost = new FormData(document.querySelector('.calendar'))
    let bookedRoom = {
        userID: customerClass.id,
        date: dayjs(dataToPost.get('date-entry')).format('YYYY/MM/DD'),
        roomNumber: parseInt(e.target.id)
    }
    return bookedRoom
}

function submitPostData(e) {
    e.preventDefault()
    let newBooking = getFormDataForPost(e)
    let postTheData = postData(newBooking)
    let fetchPromise = getData('bookings')
    Promise.all([postTheData, fetchPromise])
        .then( response => {
            console.log('success');
            booking = new Booking(response[response.length - 1])
        })
        .then(
            getCurrentDate()
        )
    }

function hide(element){
    element.classList.add('hidden')
}

function show(element){
    element.classList.remove('hidden')
}

// function toggleLoginPage(){
//     hide()
//     hide()
//     hide()
// }