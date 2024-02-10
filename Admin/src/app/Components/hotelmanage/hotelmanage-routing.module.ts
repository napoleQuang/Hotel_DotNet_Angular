import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HotelmanageComponent } from './hotelmanage.component';
import { CheckinComponent } from './bookroom/checkin/checkin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path:'',component:HotelmanageComponent},
      {path:'checkin',component:CheckinComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelManageRoutingModule { }
