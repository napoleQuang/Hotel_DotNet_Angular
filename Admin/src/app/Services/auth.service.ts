import { environment } from '../../environment/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {}

  loginService(loginObj :any)
  {
    const body = JSON.stringify(loginObj);

    // Thêm tiêu đề content type cho yêu cầu
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<any>(`${this.apiUrl}/Auth/loginef`,body,{headers})
  }
  // Hàm service GET với Authorization Bearer Token
  getWithAuthorization(authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.apiUrl}/Admin/users`;

    return this.http.get(url, { headers });
  }


}
