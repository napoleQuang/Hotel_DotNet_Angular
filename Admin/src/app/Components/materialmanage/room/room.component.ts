import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalRoomComponent } from '../../modals/modal-room/modal-room.component';
import { RoomService } from 'src/app/Services/room.service';
import { Room } from 'src/app/Models/room';
import { RoomType } from 'src/app/Models/roomtype';
import { RoomtypeService } from 'src/app/Services/roomtype.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
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
  constructor(private dialog: MatDialog, private roomService: RoomService, private roomTypeService: RoomtypeService, private snkbr: SnackbarService) { }
  rooms?: Room[]
  roomtypes?: RoomType[]
  async openAddDialog() {
    this.roomtypes = await this.roomTypeService.getAllRoomTypes().toPromise()
    let room = new Room();
    room.roomType.roomTypeId = this.roomtypes?.[0].roomTypeID
    let dialog = this.dialog.open(ModalRoomComponent, {
      width: '500px',
      data: {
        action: 'add',
        roomtypes: this.roomtypes,
        room: room
      },
    })
    dialog.afterClosed().subscribe(data => {
      this.ngOnInit()
    });
  }
  async openUpdateDialog(room: Room) {
    this.roomtypes = await this.roomTypeService.getAllRoomTypes().toPromise()
    let dialog = this.dialog.open(ModalRoomComponent, {
      width: '500px',
      data: {
        action: 'update',
        roomtypes: this.roomtypes,
        room: room
      },
    })
    dialog.afterClosed().subscribe(data => {
      this.ngOnInit()
    });
  }
  async delete(id: string) {
    let data = await this.roomService.deleteRoom(id).toPromise()
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
      this.roomService.getAllRooms().subscribe(rooms => {
        this.rooms = rooms
        this.rooms = this.sapxep(this.rooms)
      })
    }
  }

  textSearch: string = ''
  async change() {
    this.rooms = await this.roomService.getAllRooms().toPromise()
    this.rooms = this.sapxep(this.rooms!)
    this.rooms = this.rooms?.filter(room => room.roomNumber?.includes(this.textSearch.trim()))
  }
}
