import { Component, OnInit } from '@angular/core';
import { RoomtypeService } from 'src/app/Services/roomtype.service';
import { GuestService } from 'src/app/Services/guest.service';
import { RoomService } from 'src/app/Services/room.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalManageroomComponent } from '../../modals/modal-manageroom/modal-manageroom.component';
@Component({
  selector: 'app-manageroom',
  templateUrl: './manageroom.component.html',
  styleUrls: ['./manageroom.component.css']
})
export class ManageroomComponent implements OnInit {
  roomsByRoomType?: any[] = [];
  check?:string='all'
  change(){
    this.ngOnInit()
  }
  constructor(private roomTypeService: RoomtypeService, private roomService: RoomService, private guestService: GuestService, private reservationService: ReservationService, private dialog: MatDialog) { }
  openRoomDialog(room:any) {
    let dialog = this.dialog.open(ModalManageroomComponent, {
      width: '80%',
      data:room,
    })
    dialog.afterClosed().subscribe(data=>{
      
        this.ngOnInit()
      
    });
  }

  async ngOnInit() {
    this.roomsByRoomType = []
    let roomTypes = await this.roomTypeService.getAllRoomTypes().toPromise();
    
    for (let roomType of roomTypes!) {
      let rooms = await this.roomService.getRoomsByRoomTypeId(roomType.roomTypeID!).toPromise();
      if(this.check == 'available'){
        rooms = rooms?.filter(room=>room.isAvaiable)
      }
      else if(this.check == 'unavailable'){
        rooms = rooms?.filter(room=>!room.isAvaiable)
      }
      for (let room of rooms!) {
        if (!room.isAvaiable) {
          room.guest = await this.guestService.getGuestByRoomId(room.roomID).toPromise()
          room.reservation = await this.reservationService.getReservationByRoomId(room.roomID).toPromise()
          let d1 = new Date(room.reservation.endTime)
          let d2 = new Date(room.reservation.startTime)
          room.diffDays = (Math.ceil(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24))
        }
        else {
          room.guest = null
          room.reservation = null
        }
      }
      let obj = { roomType, rooms }

      this.roomsByRoomType?.push(obj)

    }
  }
}
