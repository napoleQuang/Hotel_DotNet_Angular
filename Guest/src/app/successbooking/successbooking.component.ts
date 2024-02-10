import { Component } from '@angular/core';
import { GuestService } from '../_Services/guest.service';

@Component({
  selector: 'app-successbooking',
  templateUrl: './successbooking.component.html',
  styleUrls: ['./successbooking.component.scss']
})
export class SuccessbookingComponent {
 constructor(private guestService:GuestService){}
 hoten?:string
 email?:string
 sdt?:string
 yeucau?:string
 checkin?:string
 checkout?:string
 mangSoLuongPhong?:any[]
 ngOnInit(){
  this.hoten = this.guestService.hoten
  this.email = this.guestService.email
  this.sdt = this.guestService.sdt
  this.yeucau = this.guestService.yeucau
  this.checkin = this.guestService.checkin
  this.checkout = this.guestService.checkout
  this.mangSoLuongPhong = this.guestService.mangSoLuongPhong
 }

}
