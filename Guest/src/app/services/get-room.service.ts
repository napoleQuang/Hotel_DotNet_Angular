import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetRoomService {
  private API_GETROOM = 'https://localhost:7232/api/Room';
  private GetRoomOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient:HttpClient) { }
  public getInfoRoom():Observable<any>{
    const url = `${this.API_GETROOM}`;
    return this.httpClient.get<any>(url, this.GetRoomOptions);
  }
}
