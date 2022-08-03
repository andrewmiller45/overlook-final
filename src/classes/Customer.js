class Customer {
    constructor (customerData){
        this.id = customerData.id
        this.name = customerData.name
        this.bookings = []
    }

    addBooking(booking){
        this.bookings.push(booking)
    }
}

export default Customer