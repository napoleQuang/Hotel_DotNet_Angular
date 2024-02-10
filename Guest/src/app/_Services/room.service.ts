import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  api = "https://localhost:7232/api/Room/GetRoomNotReser"
  constructor(private http: HttpClient) { }
  public getRoom(data:any):Observable<any[]>{
    return this.http.post<any[]>(this.api, data)
  }
}
