import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomType } from 'src/app/Models/roomtype';
import { RoomtypeService } from 'src/app/Services/roomtype.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-modal-roomtype',
  templateUrl: './modal-roomtype.component.html',
  styleUrls: ['./modal-roomtype.component.css']
})
export class ModalRoomtypeComponent {
  inputdata:any = this.data
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<ModalRoomtypeComponent>,private roomTypeService:RoomtypeService, private snkbr:SnackbarService){}
  closeDialog(){
    this.ref.close()
  }
  async add(roomtype:RoomType){
    let mes = await this.roomTypeService.addRoomType(roomtype).toPromise()
    if (mes.succeeded) {
      this.snkbr.openSnackBar('Add Success', 'success')
    }
    else{
      this.snkbr.openSnackBar('Add Fail', 'failed')
    }
    this.ref.close()
  }
  async update(roomtype: RoomType) {
    let data = {
      "idToUpdate": roomtype.roomTypeID,
      "name": roomtype.name,
      "areaInSquareMeters": roomtype.areaInSquareMeters,
      "description": roomtype.description,
      "dailyPrice": roomtype.dailyPrice
    }
    let mes = await this.roomTypeService.updateRoomType(data).toPromise()
    if (mes.succeeded) {
      this.snkbr.openSnackBar('Update Success', 'success')
    }
    else{
      this.snkbr.openSnackBar('Update Fail', 'failed')
    }
    this.ref.close()
  }
}
