export class Room {
  id?: string=""
  roomNumber?: string=""
  roomType?:any= {
    name: "",
    roomTypeId: "",
    description: "",
    areaInSquareMeters: 0,
    dailyPrice: 0
  }
  dateCreated?: string=""
  isAvailable?: boolean=true
}
