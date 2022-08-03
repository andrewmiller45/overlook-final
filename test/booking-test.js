import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking'

describe('Booking', () => {
    let booking1
    let bookingTestData
    let bookingClass

    beforeEach( () =>{
        bookingTestData = 
            booking1 = {
                id: '5fwrgu4i7k55hl6sz', 
                userID: 9, 
                date: '2022/04/22', 
                roomNumber: 15
            }
        bookingClass = new Booking(bookingTestData)
    })
    it('should be a function', () => {
        expect(Booking).to.be.a('function')
    })

    it('should be an instance of Booking',() =>{
        expect(bookingClass).to.be.an.instanceOf(Booking)
    })

    it('should have a unique booking id', () => {
        expect(booking1.id).to.equal('5fwrgu4i7k55hl6sz')
    })

    it('should have a user ID attached to the booking', () => {
        expect(booking1.userID).to.equal(9)
    })

    it('should have a booking date', () => {
        expect(booking1.date).to.equal('2022/04/22')
    })

    it('should have an assigned room number', () => {
        expect(booking1.roomNumber).to.equal(15)
    })
})
