import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.url
  constructor(private http:HttpClient) { }
  getBillByIdGuest(id:string):Observable<any[]>{
    let api = `${this.url}/Bill/GetBillByIDGuest?id=${id}`
    return this.http.get<any[]>(api)
  }
  getAllBill():Observable<any[]>{
    let api = `${this.url}/Bill`
    return this.http.get<any[]>(api)
  }
}
