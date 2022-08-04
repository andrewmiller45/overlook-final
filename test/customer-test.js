import chai from 'chai';
const expect = chai.expect;
import bookingData from './sample-data/bookings-data';
import roomsData from './sample-data/rooms-data';
import customerData from './sample-data/customer-data';
import Customer from '../src/classes/Customer'


describe('Customer', () => {
    let bookings
    let customer1
    let customer2
    let customer3 
    let rooms

    beforeEach( () => {
        customer1 = new Customer(customerData.customers[0])
        customer2 = new Customer(customerData.customers[1])
        customer3 = new Customer(customerData.customers[2])
        rooms = roomsData.rooms
        bookings = bookingData.bookings
    })

    it('should be a function', () => {
        expect(Customer).to.be.a('function')
    })

    it('should be an instance of Customer', () => {
        expect(customer2).to.be.an.instanceOf(Customer)
    })

    it('should have an id#', () => {
        expect(customer1.id).to.equal(1)
    })

    it('should have a name', () => {
        expect(customer1.name).to.equal('Leatha Ullrich')
    })

    it('should have a place to store bookings', () => {
        expect(customer1.bookings).to.deep.equal([])
    })

    it('should return a list of the customer\'s bookings', () => {
        customer1.findBookings(bookings)
        expect(customer1.bookings).to.deep.equal(
            [
              {
                "date": "2022/02/05",
                "id": "5fwrgu4i7k55hl6t8",
                "roomNumber": 12,
                "userID": 1
              },
              {
                "date": "2023/01/11",
                "id": "5fwrgu4i7k55hl6x8",
                "roomNumber": 20,
                "userID": 1
              }
            ]
      )
    })

    it('should add the room cost to the customer\'s booking', () => {
        customer1.findBookings(bookings)
        customer1.updateCostPerNight(rooms)
        expect(customer1.bookings[0].amount).to.equal(172.09)
    })

    it('should total up the total cost of all customer\'s bookings', () => {
        customer1.findBookings(bookings)
        customer1.updateCostPerNight(rooms)
        expect(customer1.findSpendHistory()).to.equal(516.04)
    })

})
