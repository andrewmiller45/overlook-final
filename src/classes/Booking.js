class Booking {
    constructor(bookingData){
        this.id = bookingData.id
        this.userID = bookingData.userId
        this.date = bookingData.date
        this.roomNumber = bookingData.roomNumber
    }
}

export default Booking
