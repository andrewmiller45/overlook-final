import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer'

describe('Customer', () => {
    let customer1
    let customerTestData
    let customerClass

    beforeEach( () => {
    customerTestData = 
        customer1 = {
            id: 4,
            name: "Rhiannon Little",
            bookings: []
        }
    
        customerClass = new Customer(customerTestData)
    })

    it('should be a function', () => {
        expect(Customer).to.be.a('function')
    })

    it('should be an instance of Customer', () => {
        expect(customerClass).to.be.an.instanceOf(Customer)
    })

    it('should have an id#', () => {
        expect(customer1.id).to.equal(4)
    })

    it('should have a name', () => {
        expect(customer1.name).to.equal('Rhiannon Little')
    })

    it('should have a place to store bookings', () => {
        expect(customer1.bookings).to.deep.equal([])
    })
})