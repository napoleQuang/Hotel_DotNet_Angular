import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStorageService } from './userStorage.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.url;
  constructor(private http: HttpClient, private usrSSVC: UserStorageService) { }

  updateUserInfo(updateObj: any)
  {
    const body = JSON.stringify(updateObj);
    const authToken: string = localStorage.getItem("accessToken")??'null';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.apiUrl}/Admin/users`;

    return this.http.post<any>(`${this.apiUrl}/Auth/changeuserinfo`,body,{headers})
  }
  updateUserPass(updateObj: any)
  {
    const body = JSON.stringify(updateObj);
    const authToken: string = localStorage.getItem("accessToken")??'null';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.apiUrl}/Admin/users`;

    return this.http.post<any>(`${this.apiUrl}/Auth/changepassword`,body,{headers})
  }

  getAllUser()
  {
    const authToken: string = localStorage.getItem("accessToken")??'null';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.apiUrl}/Admin/users` ;

    return this.http.get<any>(url,{headers})
  }

  getAllUserPaginator(paginatorObj:any)
  {
    const authToken: string = localStorage.getItem("accessToken")??'null';
    const body = JSON.stringify(paginatorObj); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.apiUrl}/Admin/user/getallusers` ;

    return this.http.post<any>(url,body,{headers})
  }
  
  getUser(id: string){
    
    const authToken: string = localStorage.getItem("accessToken")??'null';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.apiUrl}/Admin/user/${id}`;

    return this.http.get<any>(url,{headers})
  }

  addUser(userObj:any)
  {
    userObj.IdToUpdate="string";
    const body = JSON.stringify(userObj);
    const authToken: string = localStorage.getItem("accessToken")??'null';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.apiUrl}/Admin/user/create-staff-account`;

    return this.http.post<any>(url,body,{headers})
  }

  updateUser(userObj:any,id:string)
  {
    userObj.idToUpdate = id;
    const body = JSON.stringify(userObj);
    const authToken: string = localStorage.getItem("accessToken")??'null';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.apiUrl}/Admin/user/edit-staff-account`;

    return this.http.put<any>(url,body,{headers})
  }

  deleteUser(userId:string){
    const authToken: string = localStorage.getItem("accessToken")??'null';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    const url = `${this.apiUrl}/Admin/user/remove-staff-account?userId=${userId}`;

    return this.http.delete<any>(url,{headers})
  }

}
