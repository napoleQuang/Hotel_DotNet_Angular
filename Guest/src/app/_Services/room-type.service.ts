import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomType } from '../Models/RoomType';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  api = "https://localhost:7232/api/RoomType"
  constructor(private http:HttpClient) { }
  public getRoomType():Observable<RoomType[]>{
    return this.http.get<RoomType[]>(this.api)
  }
}
