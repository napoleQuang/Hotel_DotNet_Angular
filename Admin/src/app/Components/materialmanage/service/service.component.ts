import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Service } from 'src/app/Models/service';
import { ServiceService } from 'src/app/Services/service.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { ModalServiceComponent } from '../../modals/modal-service/modal-service.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  sapxep(mang: any[]) {
    for (let i = 0; i < mang.length - 1; i++) {
      for (let j = i + 1; j < mang.length; j++) {
        if (new Date(mang[i].dateCreated) < new Date(mang[j].dateCreated)) {
          let obj = mang[j]
          mang[j] = mang[i]
          mang[i] = obj
        }
      }
    }
    return mang;
  }
  constructor(private dialog:MatDialog,private serviceService:ServiceService,private snkbr:SnackbarService){}
  services?:Service[]
  openAddDialog(){
    let service = new Service();
    let dialog = this.dialog.open(ModalServiceComponent,{
      width:'500px',
      data:{
        action:'add',
        service: service
      },
    })
    dialog.afterClosed().subscribe(data=>{
      this.ngOnInit()
    });
  }
  openUpdateDialog(service:Service){
    let dialog = this.dialog.open(ModalServiceComponent,{
      width:'500px',
      data:{
        action:'update',
        service:service
      },
    })
    dialog.afterClosed().subscribe(data=>{
      this.ngOnInit()
    });
  }
  async delete(id:string){
    let data = await this.serviceService.deleteService(id).toPromise()
    if(data.succeeded){
      this.snkbr.openSnackBar('Delete success','success')
    }
    else{
      this.snkbr.openSnackBar('Delete fail','success')
    }
    this.ngOnInit()
  }
  ngOnInit(){
    if (this.textSearch.trim() != '') {
      this.change()
    }
    else{
      this.serviceService.getAllServices().subscribe(services=>{
        this.services = services
        this.services = this.sapxep(this.services)
      })
    }
  }

  textSearch: string = ''
  async change() {
    this.services = await this.serviceService.getAllServices().toPromise()
    this.services = this.sapxep(this.services!)
    this.services = this.services?.filter(service => service.name?.includes(this.textSearch.trim()))
  }
}
