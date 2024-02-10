import { Component } from '@angular/core';
import { GuestService } from '../_Services/guest.service';
import { ReportService } from '../_Services/report.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent {
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
