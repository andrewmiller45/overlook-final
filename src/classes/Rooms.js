class Rooms {
    constructor(roomData) {
        this.rooms = roomData
        this.roomType
        this.bedType
    }

    filterForAvailability (bookingData, date, roomType) {
        let bookedRooms = bookingData.filter(booking => booking.date === date).map(booking => booking.roomNumber)
        let availableRoomsByDate = this.rooms.filter(room => !bookedRooms.includes(room.number))
        if (!roomType && !bedType) {
            return availableRoomsByDate
        } else {
            this.roomType = roomType
            let availableRoomsByType = availableRoomsByDate.filter(room => room.roomType === this.roomType)
            return availableRoomsByType
        }
    }
}

export default Rooms