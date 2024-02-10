import { Component } from '@angular/core';
import { UserStorageService } from '../Services/userStorage.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor (private usrSvc: UserStorageService) {};
  user : string = this.usrSvc.getUserName();
  role: string = this.usrSvc.getUserRole();
  onLogout()
  {
    this.usrSvc.clearLocalStorage();
    console.log(localStorage.getItem('accessToken')??'null')
  }

}
