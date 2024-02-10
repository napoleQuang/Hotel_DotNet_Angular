
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// import { CheckinComponent } from "../hotelmanage/bookroom/checkin/checkin.component";
// import { HomeComponent } from "../home/home.component";
// import { HotelmanageComponent } from "../hotelmanage/hotelmanage.component";
// import { ProfileComponent } from "../profile/profile.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableRoutingModule } from "./table-routing.module";
import { TableComponent } from "./table.component";
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    declarations:[
        TableComponent
    ],
    imports:[
        CommonModule,
        TableRoutingModule,
        MatTabsModule,
        MatStepperModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatPaginatorModule
    ]
})

export class TableModule{}