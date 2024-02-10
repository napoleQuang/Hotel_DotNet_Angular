import { Component } from '@angular/core';
import { GuestService } from 'src/app/Services/guest.service';
import { ReportService } from 'src/app/Services/report.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent {
  constructor(private reportService:ReportService,private guestService:GuestService,private snkbr:SnackbarService){}
  reports:any[]=[]
  async ngOnInit(){
    this.reports = []
    let a = await this.reportService.getAllReport().toPromise()
    for(let i of a!){
      let guest = await this.guestService.getGuestById(i.idGuest).toPromise()
      this.reports.push({name:guest?.fullName,mess:i.mess,id:guest?.guestID})
    }
  }

  delete(id:string){
    this.reportService.deleteReportByGuestId(id).subscribe(data=>{
      if(data.succeeded){
        this.snkbr.openSnackBar('Delete success','success')
        this.ngOnInit()
      }
    })
  }
}
