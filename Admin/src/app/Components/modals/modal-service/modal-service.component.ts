import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from 'src/app/Models/service';
import { ServiceService } from 'src/app/Services/service.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-modal-service',
  templateUrl: './modal-service.component.html',
  styleUrls: ['./modal-service.component.css']
})
export class ModalServiceComponent {
  inputdata:any = this.data
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<ModalServiceComponent>,private serviceService:ServiceService, private snkbr:SnackbarService){}
  closeDialog(){
    this.ref.close()
  }
  async add(service:Service){
    let data = {
      "IdToUpdate": "string",
      "name": service.name,
      "price": service.price,
      "description": service.description
    }
    let mes = await this.serviceService.addService(data).toPromise()
    if (mes.succeeded) {
      this.snkbr.openSnackBar('Add Success', 'success')
    }
    else{
      this.snkbr.openSnackBar('Add Fail', 'failed')
    }
    this.ref.close()
  }
  async update(service: Service) {
    let data = {
      "IdToUpdate": service.id,
      "name": service.name,
      "price": service.price,
      "description": service.description
    }
    let mes = await this.serviceService.updateService(data).toPromise()
    if (mes.succeeded) {
      this.snkbr.openSnackBar('Update Success', 'success')
    }
    else{
      this.snkbr.openSnackBar('Update Fail', 'failed')
    }
    this.ref.close()
  }
}
