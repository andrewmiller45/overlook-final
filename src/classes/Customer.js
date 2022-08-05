import Booking from "./Booking"

class Customer {
    constructor (customerData){
        this.id = customerData.id
        this.name = customerData.name
        this.bookings = []
    }

    findBookings(allBookingData) {
        return this.bookings = allBookingData.filter(booking => booking.userID === this.id)
    }

    updateCostPerNight(roomData){
        this.bookings.forEach(booking => {
            roomData.forEach(room => {
                if(room.number === booking.roomNumber) {
                    booking.amount = room.costPerNight
                }
            })
        })
    }

    findSpendHistory() {
       return this.bookings.reduce((acc, booking) => {
        acc += booking.amount
        return acc
       }, 0)
    }
}

export default Customer