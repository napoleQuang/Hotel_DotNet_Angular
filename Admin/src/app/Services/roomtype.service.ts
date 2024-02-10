import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { RoomType } from '../Models/roomtype';

@Injectable({
  providedIn: 'root'
})
export class RoomtypeService {
  url = environment.url
  constructor(private http:HttpClient) { }
  getAllRoomTypes():Observable<RoomType[]>{
    let api = `${this.url}/RoomType`
    return this.http.get<RoomType[]>(api)
  }
  addRoomType(roomType: RoomType): Observable<any>{
    let api = `${this.url}/RoomType`
    return this.http.post<any>(api, roomType)
  }
  updateRoomType(roomType: RoomType): Observable<any>{
    let api = `${this.url}/RoomType`
    return this.http.put<any>(api, roomType)
  }
  deleteRoomType(id:string):Observable<any>{
    let api = `${this.url}/RoomType/${id}`
    return this.http.delete<any>(api)
  }

}
