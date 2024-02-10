import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomtypeService } from 'src/app/Services/roomtype.service';
import { RoomService } from 'src/app/Services/room.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { GuestService } from 'src/app/Services/guest.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],

})
export class CheckinComponent {
  roomsByRoomType?: any[] = [];
  number?: any;
  guest?:any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<CheckinComponent>,
    private roomTypeService: RoomtypeService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private guestService:GuestService,
    private snkbr: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    let roomTypes = await this.roomTypeService.getAllRoomTypes().toPromise();

    this.reservationService.getNumberReservation(this.data.id).subscribe(async results => {
      this.number= results.length;
      for (let roomType of roomTypes!) {
        let rooms = await this.roomService.getRoomsByRoomTypeId(roomType.roomTypeID!).toPromise();
        for(let room of rooms!) {
          room.isReserved=false;
          for(let result of results){
            if(room.roomID===result.roomID){
              room.isReserved=true;
            }
          }
        }
       
        let obj = { roomType, rooms }
        this.roomsByRoomType?.push(obj)
      }
    });

    this.guestService.getGuestById(this.data.idGuest).subscribe(result=>{
      this.guest = result
      console.log(result);
    })

    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkIn(){
    this.reservationService.checkIn(this.data.id).subscribe(result=>{
      this.snkbr.openSnackBar("Check in successfully","success");
      this.onNoClick();
    })
  }

}
