class Rooms {
    constructor(roomData) {
        this.rooms = roomData
        this.roomType
    }

    filterForAvailability (bookingData, date) {
        let bookedRooms = bookingData.filter(booking => booking.date === date).map(booking => booking.roomNumber)
        let availableRoomsByDate = this.rooms.filter(room => !bookedRooms.includes(room.number))
        if (!this.roomType) {
            return availableRoomsByDate
        } else {
            let availableRoomsByType = availableRoomsByDate.filter(room => room.roomType === this.roomType)
            return availableRoomsByType
        }
    }
}

export default Rooms