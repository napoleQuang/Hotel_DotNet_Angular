import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CheckinComponent } from "../hotelmanage/bookroom/checkin/checkin.component";
import { HomeComponent } from "./home.component";
import { HotelmanageComponent } from "../hotelmanage/hotelmanage.component";
import { ProfileComponent } from "../profile/profile.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeRoutingModule } from './home-routing.module';
import { ChartComponent } from './chart/chart.component';
import { ReportComponent } from './report/report.component';
import { TestimonialComponent } from './testimonial/testimonial.component';





@NgModule({
    declarations:[
        HomeComponent,
        ChartComponent,
        ReportComponent,
        TestimonialComponent
    ],
    imports:[
        CommonModule,
        HomeRoutingModule,
        MatTabsModule,
        MatStepperModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})

export class HomeModule{}
