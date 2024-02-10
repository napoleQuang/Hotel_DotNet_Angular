import { Component } from '@angular/core';
import { GetRoomService } from '../services/get-room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  roomData:any;
  modalId = 'staticBackdrop'; 
  constructor(private getRoomService:GetRoomService){
  }
  public ngOnInit(): void{
      this.getRoomService.getInfoRoom().subscribe((data) =>{
      this.roomData = data;
    })
  }
  
}
