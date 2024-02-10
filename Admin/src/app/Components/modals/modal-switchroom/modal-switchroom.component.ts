import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { FormBuilder, Validators } from '@angular/forms';
import { RoomtypeService } from 'src/app/Services/roomtype.service';
import { RoomService } from 'src/app/Services/room.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { GuestService } from 'src/app/Services/guest.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component'

@Component({
  selector: 'app-modal-switchroom',
  templateUrl: './modal-switchroom.component.html',
  styleUrls: ['./modal-switchroom.component.css']
})
export class ModalSwitchroomComponent {
  roomsByRoomType?: any[] = [];
  number?: any;
  guest?: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalSwitchroomComponent>,
    private dialog: MatDialog,
    private roomTypeService: RoomtypeService,
    private roomService: RoomService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    
    let roomTypes = await this.roomTypeService.getAllRoomTypes().toPromise();
    for (let roomType of roomTypes!) {
      let rooms = await this.roomService.getRoomsByRoomTypeId(roomType.roomTypeID!).toPromise();

      let data = {
        "guestFullName": "string",
        "guestPhoneNumber": "+1626630",
        "guestEmail": "string",
        "roomTypeId": roomType.roomTypeID,
        "startTime": this.data.reservation.startTime,
        "endTime": this.data.reservation.endTime,
        "numberOfRooms": 1,
        "specialNote": "string"
      }

      let roomNotResers = await this.roomService.getRoomNotServe(data).toPromise();

      for (let room of rooms!) {
        room.isActive = false;
        room.isReserved = true;
        if (room.roomNumber === this.data.roomNumber) {
          room.isActive = true;
        }

        for (let roomNotReser of roomNotResers!) {
          if (room.roomNumber === roomNotReser.roomNumber) {
            room.isReserved = false;
          }
        }
      }
      let obj = { roomType, rooms }
      this.roomsByRoomType?.push(obj)

    }

    // this.guestService.getGuestById(this.data.idGuest).subscribe(result => {
    //   this.guest = result
    //   console.log(result);
    // })
  }

  closeDialog() {
    this.dialogRef.close()
  }

  openConfirmDialog(roomNumber: string,roomID :string) {
    let dialog = this.dialog.open(ModalConfirmComponent, {
      width: '60%',
      data: {
        oldRoom: { id: this.data.roomID, number: this.data.roomNumber },
        newRoom: { id: roomID, number: roomNumber },
        reservation:this.data.reservation.reservationID
      },
    })

    dialog.afterClosed().subscribe(result => {
      this.closeDialog();
      this.ngOnInit();
    });
  }

}
