import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Room } from '../Models/room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  url = environment.url
  constructor(private http:HttpClient) { }
  getAllRooms():Observable<Room[]>{
    let api = `${this.url}/Room`
    return this.http.get<Room[]>(api)
  }
  public getRoomNotServe(data:any):Observable<any[]>{
    let api = `${this.url}/Room/GetRoomNotReser`
    return this.http.post<any[]>(api, data)
  }
  addRoom(room: Room): Observable<any>{
    let api = `${this.url}/Room`
    return this.http.post<any>(api, room)
  }
  updateRoom(room: Room): Observable<any>{
    let api = `${this.url}/Room`
    return this.http.put<any>(api, room)
  }
  deleteRoom(id:string):Observable<any>{
    let api = `${this.url}/Room/${id}`
    return this.http.delete<any>(api)
  }
  getRoomsByRoomTypeId(roomTypeId:string):Observable<any[]>{
    let api = `${this.url}/Room/GetRoomsByTypeId?roomTypeId=${roomTypeId}`
    return this.http.get<any[]>(api)
  }
  getRoomById(id:string):Observable<any>{
    let api = `${this.url}/Room/${id}`
    return this.http.get<any>(api)
  }
}
