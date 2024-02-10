import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { CheckinComponent } from "../Components/hotelmanage/bookroom/checkin/checkin.component";
import { HomeComponent } from "../Components/home/home.component";
import { HotelmanageComponent } from "../Components/hotelmanage/hotelmanage.component";
import { ProfileComponent } from "../Components/profile/profile.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";





@NgModule({
    declarations:[
        MainComponent,
        
        
    ],
    imports:[
        CommonModule,
        MainRoutingModule,
        MatTabsModule,
        MatStepperModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})

export class MainModule{}