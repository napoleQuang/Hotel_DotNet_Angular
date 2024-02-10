import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoomType } from 'src/app/Models/roomtype';
import { RoomtypeService } from 'src/app/Services/roomtype.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { ModalRoomtypeComponent } from '../../modals/modal-roomtype/modal-roomtype.component';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.css']
})
export class RoomtypeComponent {
  sapxep(mang: any[]) {
    for (let i = 0; i < mang.length - 1; i++) {
      for (let j = i + 1; j < mang.length; j++) {
        if (new Date(mang[i].dateCreated) < new Date(mang[j].dateCreated)) {
          let obj = mang[j]
          mang[j] = mang[i]
          mang[i] = obj
        }
      }
    }
    return mang;
  }
  constructor(private dialog: MatDialog, private roomTypeService: RoomtypeService, private snkbr: SnackbarService) { }
  roomtypes?: RoomType[]
  openAddDialog() {
    let roomtype = new RoomType();
    let dialog = this.dialog.open(ModalRoomtypeComponent, {
      width: '500px',
      data: {
        action: 'add',
        roomtype: roomtype
      },
    })
    dialog.afterClosed().subscribe(data => {
      this.ngOnInit()
    });
  }
  openUpdateDialog(roomtype: RoomType) {
    let dialog = this.dialog.open(ModalRoomtypeComponent, {
      width: '500px',
      data: {
        action: 'update',
        roomtype: roomtype
      },
    })
    dialog.afterClosed().subscribe(data => {
      this.ngOnInit()
    });
  }
  async delete(id: string) {
    let data = await this.roomTypeService.deleteRoomType(id).toPromise()
    if (data.succeeded) {
      this.snkbr.openSnackBar('Delete success', 'success')
    }
    else {
      this.snkbr.openSnackBar('Delete fail', 'success')
    }
    this.ngOnInit()
  }
  ngOnInit() {
    if (this.textSearch.trim() != '') {
      this.change()
    }
    else {
      this.roomTypeService.getAllRoomTypes().subscribe(roomtypes => {
        this.roomtypes = roomtypes
        this.roomtypes = this.sapxep(this.roomtypes)
      })
    }
  }

  textSearch: string = ''
  async change() {
    this.roomtypes = await this.roomTypeService.getAllRoomTypes().toPromise()
    this.roomtypes = this.sapxep(this.roomtypes!)
    this.roomtypes = this.roomtypes?.filter(roomtype => roomtype.name?.includes(this.textSearch.trim()))
  }
}
