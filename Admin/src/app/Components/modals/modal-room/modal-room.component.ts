import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Room } from 'src/app/Models/room';
import { RoomService } from 'src/app/Services/room.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-modal-room',
  templateUrl: './modal-room.component.html',
  styleUrls: ['./modal-room.component.css']
})
export class ModalRoomComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<ModalRoomComponent>,private roomService:RoomService,private snkbr:SnackbarService){}
  closeDialog(){
    this.ref.close()
  }
  addRoom(room:Room){
    let data = {
      idToUpdate: "string",
      roomNumber: room.roomNumber,
      roomTypeID: room.roomType.roomTypeId,
      isAvaiable: true
    }
    this.roomService.addRoom(data).subscribe(mes=>{
      if (mes.succeeded) {
        this.snkbr.openSnackBar('Update Success', 'success')
      }
      else{
        this.snkbr.openSnackBar('Update Fail', 'failed')
      }
      this.ref.close()
    })
  }
  update(room:Room){
    let data = {
      idToUpdate: room.id,
      roomNumber: room.roomNumber,
      roomTypeID: room.roomType.roomTypeId,
      isAvaiable: room.isAvailable
    }
    this.roomService.updateRoom(data).subscribe(mes=>{
      if (mes.succeeded) {
        this.snkbr.openSnackBar('Update Success', 'success')
      }
      else{
        this.snkbr.openSnackBar('Update Fail', 'failed')
      }
      this.ref.close()
    })
  }
  inputdata:any = this.data
}
