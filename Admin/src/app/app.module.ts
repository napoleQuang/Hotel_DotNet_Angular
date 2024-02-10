
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from './Services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserStorageService } from './Services/userStorage.service';
import { SnackbarService } from './Services/snackbar.service';
import { MatIconModule } from '@angular/material/icon';
import { ModalUserComponent } from './Components/modals/modal-user/modal-user.component';
import { ModalRoomComponent } from './Components/modals/modal-room/modal-room.component';
import { ModalRoomtypeComponent } from './Components/modals/modal-roomtype/modal-roomtype.component';
import { ModalServiceComponent } from './Components/modals/modal-service/modal-service.component';
import { ModalManageroomComponent } from './Components/modals/modal-manageroom/modal-manageroom.component';
import { ModalBillComponent } from './Components/modals/modal-bill/modal-bill.component';
import { ModalBookingComponent } from './Components/modals/modal-booking/modal-booking.component';
import { ModalSwitchroomComponent } from './Components/modals/modal-switchroom/modal-switchroom.component';
import { ModalConfirmComponent } from './Components/modals/modal-switchroom/modal-confirm/modal-confirm.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalUserComponent,
    ModalRoomComponent,
    ModalRoomtypeComponent,
    ModalServiceComponent,
    ModalBillComponent,
    ModalManageroomComponent,
    ModalBookingComponent,
    ModalSwitchroomComponent,
    ModalConfirmComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [AuthService, UserStorageService, SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
