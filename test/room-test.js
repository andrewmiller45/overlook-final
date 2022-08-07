import chai from 'chai';
const expect = chai.expect;
import Rooms from '../src/classes/Rooms'
import bookingData from './sample-data/bookings-data';
import roomsData from './sample-data/rooms-data';

describe('Room', () => {
    let roomClass
    let date
    let rooms
    let bookings

    beforeEach( () => {
        roomClass = new Rooms(rooms)
        rooms = roomsData.rooms
        bookings = bookingData.bookings
        date = "2022/01/10"
        
    })

    it('should be a function' , () => {
        expect(Rooms).to.be.a('function')
    })

    it('should be an instance of Room', () => {
        expect(roomClass).to.be.an.instanceOf(Rooms)
    })

    it('should contain all of the hotel\'s rooms', () => {
        expect(roomClass.rooms).to.deep.equal(rooms)
    })

    it('should filter available rooms by date', () => {   
        expect(roomClass.filterForAvailability(bookings, date)).to.deep.equal(
            [
                {
                "bedSize": "queen",
                "bidet": true,
                "costPerNight": 358.4,
                "numBeds": 1,
                "number": 1,
                "roomType": "residential suite"
                },
                {
                "bedSize": "full",
                "bidet": false,
                "costPerNight": 477.38,
                "numBeds": 2,
                "number": 2,
                "roomType": "suite"
                },
                {
                "bedSize": "king",
                "bidet": false,
                "costPerNight": 491.14,
                "numBeds": 1,
                "number": 3,
                "roomType": "single room"
                },
                {
                "bedSize": "queen",
                "bidet": false,
                "costPerNight": 343.95,
                "numBeds": 1,
                "number": 20,
                "roomType": "residential suite"
                }
        ])
    })
    
    it('should filter room by type too' , () => {
        expect(roomClass.filterForAvailability(bookings, date, "suite")).to.deep.equal([
            {
                "bedSize": "full",
                "bidet": false,
                "costPerNight": 477.38,
                "numBeds": 2,
                "number": 2,
                "roomType": "suite"
            }
        ])
    })
})