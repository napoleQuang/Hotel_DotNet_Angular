
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrl = environment.url

 
  hubConnection?: HubConnection;
  

  constructor(private http:HttpClient) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7232/reservationHub')
      .build();
    this.startConnection();
   }

   startConnection = () => {
    this.hubConnection
      ?.start()
      .then(() => {
        console.log('Connection started');
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  addEventFirstTime(cb:any){
    this.hubConnection?.on('firsttime',cb)
  }
  
  addEventLastTime(cb:any){
    this.hubConnection?.on('lasttime',cb)
  }

  getAllReservation(){
    const url = `${this.apiUrl}/Reservation`;
    return this.http.get<any[]>(url)
  }

  getNumberReservation(id: string){
    const url = `${this.apiUrl}/ReservationRoom/GetReservationsByReservationID?id=${id}`;
    return this.http.get<any[]>(url)
  }

  checkIn(id:string){
    const url = `${this.apiUrl}/Reservation/CheckIn?IDReservation=${id}`;
    return this.http.get<any[]>(url)
  }

  getReservationByRoomId(id: string):Observable<any>{
    const url = `${this.apiUrl}/Reservation/GetReservationByRoom?IDRoom=${id}`
    return this.http.get<any>(url)
  }
  checkOut(id:string){
    const url = `${this.apiUrl}/Reservation/CheckOut?IDReservation=${id}`
    return this.http.get(url)
  }
  Book(data: any):any{
    const url = `${this.apiUrl}/Reservation/NewReserveRooms`
    return this.http.post<any>(url, data)
  }
  Cancel(id:string):any{
    const url = `${this.apiUrl}/Reservation/Cancel?IDReservation=${id}`
    return this.http.get<any>(url)
  }
  SwitchRoom(data: any):any{
    const url = `${this.apiUrl}/Reservation/SwitchRoom`
    return this.http.post<any>(url, data)
  }

}
