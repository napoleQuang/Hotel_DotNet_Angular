import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationroomService {
  url = environment.url
  constructor(private http:HttpClient) { }
  getRoomIdByReservationId(id:string):Observable<any[]>{
    let api = `${this.url}/ReservationRoom/GetReservationsByReservationID?id=${id}`
    return this.http.get<any[]>(api)
  }
}
