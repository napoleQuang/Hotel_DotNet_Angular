import { RoomService } from 'src/app/Services/room.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ServiceService } from 'src/app/Services/service.service';
import { ModalBillComponent } from '../modal-bill/modal-bill.component';
import {ModalSwitchroomComponent} from '../modal-switchroom/modal-switchroom.component';
import { UserStorageService } from 'src/app/Services/userStorage.service';
import { GuestserviceService } from 'src/app/Services/guestservice.service';
import { BillService } from 'src/app/Services/bill.service';

import { ReservationroomService } from 'src/app/Services/reservationroom.service';
import { RoomtypeService } from 'src/app/Services/roomtype.service';

@Component({
  selector: 'app-modal-manageroom',
  templateUrl: './modal-manageroom.component.html',
  styleUrls: ['./modal-manageroom.component.css']
})
export class ModalManageroomComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ModalManageroomComponent>, private dialog: MatDialog, private serviceService: ServiceService, private userSSVC: UserStorageService, private gsService: GuestserviceService, private billService: BillService, private rrService: ReservationroomService, private roomTypeService: RoomtypeService, private roomService: RoomService) { }
  inputdata: any = this.data
  services?: any[]
  guestservice?: any[] = []
  guestroom?: any[] = []
  async ngOnInit() {
    this.guestservice = []
    this.guestroom = []
    this.services = await this.serviceService.getAllServices().toPromise();
    let gs = await this.gsService.getServiceByGuestId(this.inputdata.guest.guestID).toPromise()
    let gr = await this.rrService.getRoomIdByReservationId(this.inputdata.reservation.reservationID).toPromise()
    let roomtypes = await this.roomTypeService.getAllRoomTypes().toPromise()
    for (let s of this.services!) {
      s.number = 0
    }
    for (let rt of roomtypes!) {
      let number = 0;
      for (let i of gr!) {
        let room = await this.roomService.getRoomById(i.roomID).toPromise()
        if (room.roomTypeID == rt.roomTypeID) number++
      }
      if (number > 0) this.guestroom?.push({ name: rt.name, price: rt.dailyPrice, number: number, priceTotal: number * rt.dailyPrice! * this.inputdata.diffDays })
    }
    for (let i of gs!) {
      for (let s of this.services!) {
        if (i.serviceID == s.id) {
          this.guestservice?.push({ name: s.name, number: i.number, price: s.price, priceTotal: s.price! * i.number })
        }
      }
    }
  }
  closeDialog() {
    this.ref.close()
  }
  async openBillDialog() {
    let bills = await this.billService.getBillByIdGuest(this.inputdata.guest.guestID).toPromise()
    this.inputdata.bill = bills?.find(b => !b.status)
    this.inputdata.userName = this.userSSVC.getUserFullName()
    this.inputdata.guestservice = this.guestservice
    this.inputdata.guestroom = this.guestroom
    
    let dialog = this.dialog.open(ModalBillComponent, {
      width: '60%',
      data: this.inputdata,
    })

    dialog.afterClosed().subscribe(data => {
      if(data == "checkout"){
        this.ref.close(data)
      }
    });
  }

  async openSwitchRoomDialog() {
    let dialog = this.dialog.open(ModalSwitchroomComponent, {
      width: '60%',
      height:'80%',
      data: this.inputdata,
    })
    dialog.afterClosed().subscribe(data => {
     
        this.ref.close(data)
      
    });
  }


  async themDichVu() {
    for (let s of this.services!) {
      if (s.number > 0) await this.gsService.addGuestService({
        guestID: this.inputdata.guest.guestID,
        serviceID: s.id,
        number: s.number
      }).toPromise()
    }
    this.ngOnInit()
  }
}