import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url = environment.url
  constructor(private http:HttpClient) { }
  getAllReport(): Observable<any[]>{
    let api = `${this.url}/Report`
    return this.http.get<any[]>(api)
  }
  deleteReportByGuestId(id:string){
    let api = `${this.url}/Report/${id}`
    return this.http.delete<any>(api)
  }
}
