import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarService } from '../../../Services/snackbar.service';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                                       private dialogRef: MatDialogRef<ModalUserComponent>,
                                       private formBuilder: FormBuilder,
                                       private snkbr: SnackbarService,
                                       private userSVC: UserService) { }

  userForm!: FormGroup; //form user
  
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: '',
      fullName: '',
      email: '',
    })
   
    if(this.data&&this.data.id){
      this.userSVC.getUser(this.data.id).subscribe(result => {
          this.userForm = this.formBuilder.group({
            userName: result.userName,
            fullName: result.fullName,
            email: result.email,
          })
        }
      )
    }
  }

  //tắt modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  //thêm nhân viên
  addUser() {
    var email = this.userForm.value.email;
    var fullName =this.userForm.value.fullName;
    var userName =this.userForm.value.userName;
    
    if (email.trim() && fullName.trim() && userName.trim()) {
      this.userSVC.addUser(this.userForm.value).subscribe(data => {
        console.log(data);
        if(data.succeeded == false) {
          this.snkbr.openSnackBar(data.mess, 'failed');
          //nthis. onNoClick();
        }
        else{
          this.snkbr.openSnackBar("User added successfully", 'success');
          this. onNoClick();
        }
      })
    }
    else {
      this.snkbr.openSnackBar('Please fill input', 'failed');
    }
  }

  updateUser(){
    var email = this.userForm.value.email;
    var fullName =this.userForm.value.fullName;
    var userName =this.userForm.value.userName;
    console.log(this.data.idToUpdate);
    if (email.trim() && fullName.trim() && userName.trim()) {
      this.userSVC.updateUser(this.userForm.value,this.data.id).subscribe(data => {
       
        if(data.succeeded == false) {
          this.snkbr.openSnackBar(data.mess, 'failed');
          //nthis. onNoClick();
        }
        else{
          this.snkbr.openSnackBar("Update added successfully", 'success');
          this. onNoClick();
        }
      })
    }
    else {
      this.snkbr.openSnackBar('Please fill input', 'failed');
    }
  }

}
