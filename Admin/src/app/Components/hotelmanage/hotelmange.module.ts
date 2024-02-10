import { HotelManageRoutingModule } from './hotelmanage-routing.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { CheckinComponent } from "./bookroom/checkin/checkin.component";
import { HotelmanageComponent } from "./hotelmanage.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import { BookroomComponent } from './bookroom/bookroom.component';
import { ManageroomComponent } from './manageroom/manageroom.component';





@NgModule({
    declarations:[
        HotelmanageComponent,
        CheckinComponent,
        BookroomComponent,
        ManageroomComponent
    ],
    imports:[
        MatDialogModule,
        CommonModule,
        HotelManageRoutingModule,
        MatTabsModule,
        MatStepperModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
    ]
})

export class HotelManageModule{}