import { Component } from '@angular/core';
import { BillService } from 'src/app/Services/bill.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  constructor(private billService: BillService) { }
  strdate1:any
  strdate2:any
  bills?: any[]
  billDate?:any[] = []
  sum = 0
  async ngOnInit(){
    this.bills = []
    this.bills = await this.billService.getAllBill().toPromise()
    this.bills = this.bills?.filter(bill => bill.status)
    
  }
  onSubmit(){
    this.sum = 0
    this.billDate = this.bills?.filter(bill => {
      let dateBill = new Date(bill.dateCreated.slice(0, 10)+ " 00:00:00")
      return dateBill >= new Date(this.strdate1+ " 00:00:00") && dateBill <= new Date(this.strdate2+ " 00:00:00")
    })
    this.billDate?.forEach(bill => this.sum+=bill.sum)
    console.log(this.billDate)
  }
}
