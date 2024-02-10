import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomType } from '../Models/RoomType';
import { RoomTypeService } from '../_Services/room-type.service';
import { ReservationService } from '../_Services/reservation.service';
import { RoomService } from '../_Services/room.service';
import { GuestService } from '../_Services/guest.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  roomtypes?: any[];
  mangSoLuongPhong: any = []
  mindateCheckin?: string
  mindateCheckout?: string
  dateCheckin?: string
  dateCheckout?: string
  FormBooking!: FormGroup;
  submitted = false;

  DateToString(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
  }

  async LaySoLuongPhongTrong(roomtypes: any[], dateCheckin: string, dateCheckout: string) {
    let data = {
      "guestFullName": "string",
      "guestPhoneNumber": "+0",
      "guestEmail": "string",
      "roomTypeId": "",
      "startTime": dateCheckin,
      "endTime": dateCheckout,
      "numberOfRooms": 1,
      "specialNote": "string"
    }

    for (let roomtype of roomtypes) {
      data.roomTypeId = roomtype.roomTypeID
      let slp = await this.roomService.getRoom(data).toPromise()
      roomtype.slp = new Array(slp?.length)
    }
    return roomtypes
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private roomTypeService: RoomTypeService, private reservationService: ReservationService, private roomService: RoomService, private guestService: GuestService) { }
  async ngOnInit() {
    this.FormBooking = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sodienthoai: ['', [Validators.required, Validators.maxLength(10)]],
      yeucau: ['']
    })
    this.roomtypes = await this.roomTypeService.getRoomType().toPromise()

    let date = new Date()
    date.setDate(date.getDate() + 1)
    this.mindateCheckin = this.dateCheckin = this.DateToString(date)
    date.setDate(date.getDate() + 1)
    this.mindateCheckout = this.dateCheckout = this.DateToString(date)

    this.roomtypes = await this.LaySoLuongPhongTrong(this.roomtypes!, this.dateCheckin, this.dateCheckout)
  }


  async onChange() {
    let Ddate2 = new Date(this.dateCheckout!)
    let Ddate1 = new Date(this.dateCheckin!)
    let date = new Date(this.dateCheckin!)
    date.setDate(date.getDate() + 1)
    if (Ddate1 >= Ddate2) {
      this.dateCheckout = this.DateToString(date)
    }
    this.mindateCheckout = this.DateToString(date)

    this.roomtypes = await this.LaySoLuongPhongTrong(this.roomtypes!, this.dateCheckin!, this.dateCheckout!)
  }

  async onChange2(){
    this.roomtypes = await this.LaySoLuongPhongTrong(this.roomtypes!, this.dateCheckin!, this.dateCheckout!)
  }

  async onSubmit() {
    this.submitted = true;
    if (this.FormBooking.invalid) {
      return
    }
    else {

      let check = false;
      this.mangSoLuongPhong = []
      let inputSoLuongPhong: any = document.getElementsByClassName("soluongphong")
      inputSoLuongPhong = [...inputSoLuongPhong]
      for (let i of inputSoLuongPhong) {
        let item = { id: i.id, name: i.name, number: i.value }
        this.mangSoLuongPhong.push(item);
        if (i.value > 0) check = true
      }
      if (!check) {
        alert("Bạn phải chọn số lượng phòng")
        return
      }
      let data = {
        "guestFullName": this.FormBooking.value.name,
        "guestPhoneNumber": "+" + this.FormBooking.value.sodienthoai,
        "guestEmail": this.FormBooking.value.email,
        "roomTypeId": "",
        "startTime": this.dateCheckin,
        "endTime": this.dateCheckout,
        "numberOfRooms": 0,
        "specialNote": this.FormBooking.value.yeucau
      }
      let checkSoLuongPhong = true
      for (let i of this.mangSoLuongPhong) {
        if (i.number == 0) continue
        data.roomTypeId = i.id
        data.numberOfRooms = Number(i.number)
        let slp = await this.roomService.getRoom(data).toPromise()
        if (slp!.length < data.numberOfRooms) {
          checkSoLuongPhong = false
        }
      }

      if (checkSoLuongPhong) {
        for (let i of this.mangSoLuongPhong) {
          if (i.number == 0) continue
          data.roomTypeId = i.id
          data.numberOfRooms = Number(i.number)
          await this.reservationService.DatPhong(data).toPromise()

        }
        this.guestService.hoten = this.FormBooking.value.name
        this.guestService.email = this.FormBooking.value.email
        this.guestService.sdt = this.FormBooking.value.sodienthoai
        this.guestService.yeucau = this.FormBooking.value.yeucau
        this.guestService.checkin = this.dateCheckin
        this.guestService.checkout = this.dateCheckout
        this.guestService.mangSoLuongPhong = this.mangSoLuongPhong
        this.router.navigate(['/successbooking'])
      }
      else {
        alert("Khách sạn không đủ phòng")
      }


    }
  }

}



