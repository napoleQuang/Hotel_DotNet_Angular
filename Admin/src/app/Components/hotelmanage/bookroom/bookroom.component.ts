import { Component } from '@angular/core';
import { ReservationService } from 'src/app/Services/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckinComponent } from './checkin/checkin.component';
import { SnackbarService } from '../../../Services/snackbar.service';
import { ModalBookingComponent } from '../../modals/modal-booking/modal-booking.component';
@Component({
  selector: 'app-bookroom',
  templateUrl: './bookroom.component.html',
  styleUrls: ['./bookroom.component.css']
})
export class BookroomComponent {
  constructor(private reservationService: ReservationService, public dialog: MatDialog, private snkbr: SnackbarService) {
    this.reservationService.addEventFirstTime((data: any) => {
      let audio = new Audio()
      audio.src ='../../../../assets/audio/booking-request-received.mp3'
      audio.load()
      audio.play()

      this.reservationsWithNumber = []
      this.sapxep(data)
      data = data.filter((rs: any) => rs.isConfirm == false);
      data.map(async (reservation: any) => {
        this.reservationsWithNumber.push({ reservation, number: reservation.reservatedRooms?.length });
      })
      
    })

    this.reservationService.addEventLastTime((data: any) => {
      this.reservationsWithNumber = []
      this.sapxep(data)
      data = data.filter((rs: any) => rs.isConfirm == false);
      data.map(async (reservation: any) => {
        this.reservationsWithNumber.push({ reservation, number: reservation.reservatedRooms?.length });
      })
      
    })
  }

  async reloadData(data: any){
    this.reservationsWithNumber = []
      this.sapxep(data)
      data = data.filter((rs: any) => rs.isConfirm == false);
      data.map(async (reservation: any) => {
        let item = await this.reservationService.getNumberReservation(reservation.reservationID).toPromise()
        this.reservationsWithNumber.push({ reservation, number: item?.length });
      })
  }

  reservationsWithNumber: any[] = [];

  async ngOnInit() {
    this.reservationsWithNumber = [];
    this.reservationService.getAllReservation().subscribe(reservations => {
      this.sapxep(reservations);
      reservations = reservations.filter((rs: any) => rs.isConfirm == false);
      reservations.map(reservation => {
        this.reservationService.getNumberReservation(reservation.reservationID).subscribe(item => {
          this.reservationsWithNumber.push({ reservation, number: item.length });
        });
      })
    });
  }

  sapxep(mang: any[]) {
    for (let i = 0; i < mang.length - 1; i++) {
      for (let j = i + 1; j < mang.length; j++) {
        if (new Date(mang[i].dateCreated) > new Date(mang[j].dateCreated)) {
          let obj = mang[j]
          mang[j] = mang[i]
          mang[i] = obj
        }
      }
    }
    return mang;
  }

  openDialogCheckIn(idReservation: string, idGuest: string): void {
    const dialogRef = this.dialog.open(CheckinComponent, {
      width: '80%',
      height: '80%',
      data: { id: idReservation, idGuest }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reservationsWithNumber = [];
      this.ngOnInit();
    });
  }


  openDialogBook(): void {
    const dialogRef = this.dialog.open(ModalBookingComponent, {
      width: '80%',
      height: '90%',
      data: { /* Thêm dữ liệu nếu cần thiết */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reservationsWithNumber = [];
      this.ngOnInit();
    });
  }

  Cancel(id: string) {
    this.reservationService.Cancel(id).subscribe((result: any) => {
      this.ngOnInit();
      this.snkbr.openSnackBar("Delete reservation successfully", "success");
    });
  }
}
