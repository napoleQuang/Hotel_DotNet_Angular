
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
// import { CheckinComponent } from "../checkin/checkin.component";
// import { HomeComponent } from "../home/home.component";
// import { HotelmanageComponent } from "../hotelmanage/hotelmanage.component";
import { ProfileComponent } from "./profile.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileRoutingModule } from "./profile-routing.module";





@NgModule({
    declarations:[
        ProfileComponent
    ],
    imports:[
        CommonModule,
        ProfileRoutingModule,
        MatTabsModule,
        MatStepperModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})

export class ProfileModule{}