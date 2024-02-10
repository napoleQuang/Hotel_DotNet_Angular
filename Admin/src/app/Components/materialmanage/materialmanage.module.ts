
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialManageRoutingModule } from "./materialmanage-routing.module";
import { MaterialmanageComponent } from "./materialmanage.component";
import { RoomComponent } from './room/room.component';
import { RoomtypeComponent } from './roomtype/roomtype.component';
import { ServiceComponent } from './service/service.component';
import { MatDialogModule } from "@angular/material/dialog";



@NgModule({
    declarations:[
        MaterialmanageComponent,
        RoomComponent,
        RoomtypeComponent,
        ServiceComponent
    ],
    imports:[
        CommonModule,
        MaterialManageRoutingModule,
        MatTabsModule,
        MatStepperModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule
    ]
})

export class MaterialManageModule{}