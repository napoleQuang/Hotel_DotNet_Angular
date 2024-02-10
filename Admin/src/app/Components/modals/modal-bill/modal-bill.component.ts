import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from 'src/app/Services/reservation.service';

@Component({
  selector: 'app-modal-bill',
  templateUrl: './modal-bill.component.html',
  styleUrls: ['./modal-bill.component.css']
})
export class ModalBillComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<ModalBillComponent>,private reservationService:ReservationService){}
  inputdata:any = this.data
  date?:string
  closeDialog(){
    this.ref.close()
  }
  async checkOut(){
    await this.reservationService.checkOut(this.inputdata.reservation.reservationID).toPromise()
    this.ref.close("checkout")
  }
  ngOnInit(){
    this.date = new Date().
    toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
    replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
  }
}
