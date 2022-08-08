class Rooms {
    constructor(roomData) {
        this.rooms = roomData
        this.roomType
        this.availableRoomsByDate
        this.availableRoomsByType
    }

    filterForAvailability (bookingData, date, roomType) {
        let bookedRooms = bookingData.filter(booking => booking.date === date).map(booking => booking.roomNumber)
            this.availableRoomsByDate = this.rooms.filter(room => !bookedRooms.includes(room.number))
        if (!roomType) {
            return this.availableRoomsByDate
        } else {
            this.roomType = roomType
            this.availableRoomsByType = this.availableRoomsByDate.filter(room => room.roomType === this.roomType)
            return this.availableRoomsByType
        }
    }
}

export default Rooms