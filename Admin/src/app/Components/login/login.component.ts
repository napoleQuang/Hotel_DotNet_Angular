import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from '../../Services/userStorage.service';
import { SnackbarService } from '../../Services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = ''; // Thêm biến để lưu thông báo lỗi

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private snkbr: SnackbarService, private usersv: UserStorageService) { }

  ngOnInit(): void {
    const usrAccsTkn = localStorage.getItem('accessToken') ?? 'null'
    console.log(usrAccsTkn);
    if (usrAccsTkn!='null')
    {
      this.auth.getWithAuthorization(usrAccsTkn).subscribe(
        {
          next:() => {
            this.snkbr.openSnackBar('Session restored','success');
            this.router.navigate(['main']);
          },
          error: () => {
              this.snkbr.openSnackBar('Session expired','failed');
              this.usersv.clearLocalStorage();
              this.loginForm = this.formBuilder.group({
                userNameOrEmailOrPhoneNumber: ['', Validators.required],
                password: ['', Validators.required],
                rememberMe: false // Đặt giá trị mặc định tại đây
              });
            }
          }
      )
    }
    else
    {
      this.loginForm = this.formBuilder.group({
        userNameOrEmailOrPhoneNumber: ['', Validators.required],
        password: ['', Validators.required],
        rememberMe: false // Đặt giá trị mặc định tại đây
      })
    }
  }

  onSubmit() {
    if (this.loginForm.get('rememberMe')?.value === null) {
      this.loginForm.get('rememberMe')?.setValue(false);
    }
    if (this.loginForm.valid) {
      this.auth.loginService(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.snkbr.openSnackBar('Login successful', 'success');
            this.usersv.setLocalStorage(res);
            this.router.navigate(['main']);
            console.log(localStorage.getItem('accessToken') ?? 'null')
          },
          error: (err) => {
            if (err?.error && err.error.errors) {
              // Kiểm tra nếu có lỗi và mã lỗi là "InvalidCredentials"
              const error = err.error.errors.find((e: any) => e.code === 'InvalidCredentials');
              if (error) {
                this.snkbr.openSnackBar(error.description, 'error');
              }
            }
            this.loginForm.reset();
          }
        });
    } else {
      // Kiểm tra tính hợp lệ của các trường và hiển thị lỗi nếu cần
      this.validateAllFormFields(this.loginForm);
    }
  }

  private validateAllFormFields(loginForm: FormGroup) {
    Object.keys(loginForm.controls).forEach((field) => {
      const control = loginForm.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
