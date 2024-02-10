// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../../Services/userStorage.service';
import { UserService } from '../../Services/user.service';
import { SnackbarService } from '../../Services/snackbar.service';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private userSSVC: UserStorageService, private userSVC: UserService, private snkbr: SnackbarService, private auth: AuthService, private formBuilder: FormBuilder) {}

  userInfoForm!:FormGroup;
  userUpdatePass!:FormGroup
  user: string = this.userSSVC.getUserName();
  role: string = this.userSSVC.getUserRole();
  fullName: string = this.userSSVC.getUserFullName();
  email: string = this.userSSVC.getUserEmail();

  ngOnInit(): void {
    this.userInfoForm= this.formBuilder.group({
      fullName: this.fullName,
      email: this.email
    });
    this.userUpdatePass=this.formBuilder.group({
      oldPassword:'',
      newPassword:'',
      confirmNewPassword:'',
    })
  }
  

  updateUserSettings() {
    if (this.userInfoForm.value.fullName != this.fullName || this.userInfoForm.value.email != this.email)
    {
        this.userSVC.updateUserInfo(this.userInfoForm.value).subscribe({
          next: () =>
          {
            this.userSSVC.setNewUserInfo(this.userInfoForm.value.fullName, this.userInfoForm.value.email);
            
            this.user= this.userSSVC.getUserName();
            this.role = this.userSSVC.getUserRole();
            this.fullName = this.userSSVC.getUserFullName();
            this.email = this.userSSVC.getUserEmail();
            this.snkbr.openSnackBar('New infomation updated', 'success');

             //window.location.reload();
             // không cần reload tốn time mà thay đổi biến user,role,... đẻ components tự render
          },
          error: (err) =>
          {
            this.snkbr.openSnackBar('Error encountered','failed');
            //window.location.reload();
            //lỗi thì chỉ hiện bên consolofg chứ ko hiện lên giao diện nên ko cần reload
          }

        })
    }
    else
    {
      this.snkbr.openSnackBar('Please update your Full Name or Email','failed');
    }
  }
  updateUserPass()
  {
    if (this.userUpdatePass.value.newPassword === this.userUpdatePass.value.confirmNewPassword) {
      // Kiểm tra xem mật khẩu mới đáp ứng yêu cầu
      const newPassword = this.userUpdatePass.value.newPassword;

      // Biểu thức chính quy để kiểm tra mật khẩu mới
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{6,}$/;

      if (passwordPattern.test(newPassword)) {
        // Mật khẩu mới đáp ứng yêu cầu, thực hiện yêu cầu cập nhật
        this.userSVC.updateUserPass(this.userUpdatePass.value).subscribe({
          next: (res) => {
            if (res.succeeded === true) {
              this.snkbr.openSnackBar("Password updated successfully", "success");
              //window.location.reload();
             // không cần reload tốn time vì pass ko hiện cho client
            } else {
                this.snkbr.openSnackBar("Incorrect Old Password", 'error');
            }
            this.userUpdatePass.reset();
          },
          error: (err) => {
            if (err.error && err.error.errors) {
              const error1 = err.error.errors.find((e: any) => e.code === 'PasswordMismatch');
              this.snkbr.openSnackBar("Incorrect Old Password", 'error');
            }
            this.userUpdatePass.reset();
          }
        });
      } else {
        // Mật khẩu mới không đáp ứng yêu cầu
        this.snkbr.openSnackBar("New password must contain at least 1 uppercase letter, 1 digit, and 1 special character (@#$%^&+=!) and be at least 6 characters long", 'error');
      }
    } else {
      this.snkbr.openSnackBar("New password and Confirm New Password do not match", 'error');
    }
  }
}
