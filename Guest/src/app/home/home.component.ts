import { Component, OnInit } from '@angular/core';
import {  FormGroup,FormControl, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { GuestService } from '../_Services/guest.service';
import { ReportService } from '../_Services/report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  report: any[] = [];
  constructor(private guestService: GuestService,private reportService: ReportService){}
  ngOnInit(){
    this.report=[];
    this.reportService.getAllReport().subscribe(results=>{
      results.map((item:any)=>{
        this.guestService.getGuestById(item.idGuest).subscribe(i=>{
          this.report.push({name: i.fullName,mess:item.mess})
        })
      })
    })
  }
}
