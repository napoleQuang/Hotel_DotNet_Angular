import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularTestGit';
  check(){
    let a = document.getElementsByClassName('nav-item dropdown')[0]?.querySelector('.dropdown-item.active');
    if(a) return true
    else return false
  }
}
