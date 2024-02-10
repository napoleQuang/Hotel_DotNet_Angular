import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule, FormControl, FormBuilder, Validator, Validators } from '@angular/forms';
import { RoomtypeService } from '../../../Services/roomtype.service';
import { ReservationService } from '../../../Services/reservation.service';
import { RoomService } from '../../../Services/room.service';
import { SnackbarService } from '../../../Services/snackbar.service';
@Component({
  selector: 'app-modal-booking',
  templateUrl: './modal-booking.component.html',
  styleUrls: ['./modal-booking.component.css']
})
export class ModalBookingComponent {
  roomtypes: any[] = [];
  mangSoLuongPhong: any = [];
  dateCheckin: string = ""
  dateCheckout: string = ""
  FormBooking!: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<ModalBookingComponent>,
    private formBuilder: FormBuilder,
    private roomTypeService: RoomtypeService,
    private reservationService: ReservationService,
    private snkbr: SnackbarService,
    private roomService: RoomService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.FormBooking = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sodienthoai: ['', [Validators.required, Validators.maxLength(10)]],
      yeucau: ['']
    })
    this.roomTypeService.getAllRoomTypes().subscribe((data: any[]) => {
      this.roomtypes = data
    })
  }

  async onSubmit() {
    this.submitted = true;
    if (this.FormBooking.invalid) {
      return
    }
    else {
      if (this.dateCheckin == "" || this.dateCheckout == "") {
        this.snkbr.openSnackBar("Bạn phải nhập ngày đến và ngày đi","failed")
        return
      }
      else {
        let currentdate = new Date();
        let a = Date.parse(this.dateCheckin)
        let b = Date.parse(this.dateCheckout)
        let date1 = new Date(a);
        let date2 = new Date(b);
        if (date1 >= date2) {
          this.snkbr.openSnackBar("Ngày đến phải nhỏ hơn ngày đi ít nhất 1 ngày","failed")
          return
        }
        else if (date1 < currentdate) {
          this.snkbr.openSnackBar("Bạn phải đặt phòng trước ít nhất 1 ngày","failed")
          return
        }
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
          this.snkbr.openSnackBar("Bạn phải chọn số lượng phòng","failed")
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
          let slp = await this.roomService.getRoomNotServe(data).toPromise()
          if (slp!.length < data.numberOfRooms) {
            checkSoLuongPhong = false
          }
        }

        if (checkSoLuongPhong) {
          for (let i of this.mangSoLuongPhong) {
            if (i.number == 0) continue
            data.roomTypeId = i.id
            data.numberOfRooms = Number(i.number)
            await this.reservationService.Book(data).toPromise()
            this.snkbr.openSnackBar("Bạn đã đặt phòng thành công","success")
            this.onNoClick()   
          }
        }
        else {
          this.snkbr.openSnackBar("Khách sạn không đủ phòng","failed")
        }


      }
    }

  }
}
