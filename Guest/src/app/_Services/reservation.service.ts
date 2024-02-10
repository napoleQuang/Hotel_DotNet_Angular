import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private api ="https://localhost:7232/api/Reservation/NewReserveRooms"
  
  constructor(private http:HttpClient) { }
  DatPhong(data: any):any{
    return this.http.post<any>(this.api, data)
  }
}
