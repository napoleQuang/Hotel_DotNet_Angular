import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GuestService } from '../_Services/guest.service';
import { ReportService } from '../_Services/report.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  FormContact!: FormGroup;
  guest: any[] = [];
  constructor(private formBuilder: FormBuilder, private guestService: GuestService,private reportService: ReportService) { }

  ngOnInit() {
    this.FormContact = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mess: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.FormContact.value.mess && this.FormContact.value.email) {
      this.guestService.getAllGuest().subscribe(result => {
        this.guest = result.filter((g: any) => g.email == this.FormContact.value.email)
        if(this.guest.length > 0){
          this.reportService.addReport({idGuest:this.guest[0].guestID,mess:this.FormContact.value.mess}).subscribe(result => {
            alert("Bạn đã phản hồi thành công")
            this.ngOnInit();
          });
          
        }
        else{
          alert("Bạn chưa đặt phòng trước đó thì không thể phản hồi")
        }
      })
    }
    else {
      alert("Bạn phải nhập đủ thông tin")
    }
  }
}
