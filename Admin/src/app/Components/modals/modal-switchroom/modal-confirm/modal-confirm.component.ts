
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef , MatDialog} from '@angular/material/dialog';

import { FormBuilder, Validators } from '@angular/forms';
import { RoomtypeService } from 'src/app/Services/roomtype.service';
import { RoomService } from 'src/app/Services/room.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { GuestService } from 'src/app/Services/guest.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent {
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    private reservationService: ReservationService, 
    private snkbr: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    async ngOnInit() {
      console.log(this.data);
    }

    closeDialog() {
      this.dialogRef.close()
    }

    async submit(){
      const data={
        "idReservation": this.data.reservation,
        "idOldRoom": this.data.oldRoom.id,
        "idNewRoom": this.data.newRoom.id
      }

      await this.reservationService.SwitchRoom(data).toPromise();
      this.snkbr.openSnackBar("Bạn đã đổi phòng thành công","success");
      this.dialogRef.close()
    }
  
    
}
