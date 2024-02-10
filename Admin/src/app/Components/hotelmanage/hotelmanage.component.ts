
import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-hotelmanage',
  templateUrl: './hotelmanage.component.html',
  styleUrls: ['./hotelmanage.component.css']
})
export class HotelmanageComponent {
  @ViewChild('manageTab') manageTab: any; 
  @ViewChild('checkinTab') checkinTab: any; 

  tabChanged(event: any): void {
    if (event === 0) {
      this.manageTab.roomsByRoomType=[];
      this.manageTab.ngOnInit();
      
    } else if (event === 1) {
      this.checkinTab.reservationsWithNumber=[];
      this.checkinTab.ngOnInit(); 
    }
  }
}
