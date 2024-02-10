import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GuestserviceService {
  url = environment.url
  constructor(private http:HttpClient) { }

  getServiceByGuestId(id:string):Observable<any[]> {
    let api = `${this.url}/GuestService/GetGuestServicesByGuestID?id=${id}`
    return this.http.get<any[]>(api)
  }
  addGuestService(data:any){
    let api = `${this.url}/GuestService`
    return this.http.post(api, data)
  }
}
