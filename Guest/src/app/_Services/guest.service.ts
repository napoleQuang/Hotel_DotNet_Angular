import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  hoten?:string
  sdt?:string
  email?:string
  checkin?:string
  checkout?:string
  yeucau?:string
  mangSoLuongPhong?:any[]

  constructor(private http:HttpClient) { }

  getAllGuest(){
    const api ="https://localhost:7232/api/Guest"
    return this.http.get<any>(api);
  }
  getGuestById(id:string){
    const api =`https://localhost:7232/api/Guest/${id}`;
    return this.http.get<any>(api);
  }
}
