import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserStorageService } from './userStorage.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private usersv: UserStorageService, private router: Router, private snk: SnackbarService) {}

  canActivate(): Observable<boolean> {
    const usrAccsTkn = localStorage.getItem('accessToken') ?? 'null';

    if (usrAccsTkn !== 'null') {
      return this.authService.getWithAuthorization(usrAccsTkn).pipe(
        map(() => true),
        catchError(() => of(false)) // Bao bọc giá trị false trong một Observable
      );
    } else {
      // Redirect đến trang đăng nhập nếu accessToken không hợp lệ
      this.snk.openSnackBar("You must login first", "error");
      this.router.navigate(['/login']);
      return of(false); // Bao bọc giá trị false trong một Observable
    }
  }
}
