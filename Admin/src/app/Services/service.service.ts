import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Service } from '../Models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = environment.url
  constructor(private http:HttpClient) { }
  getAllServices():Observable<Service[]>{
    let api = `${this.url}/Service`
    return this.http.get<Service[]>(api)
  }
  addService(service: Service): Observable<any>{
    let api = `${this.url}/Service`
    return this.http.post<any>(api, service)
  }
  updateService(service: Service): Observable<any>{
    let api = `${this.url}/Service`
    return this.http.put<any>(api, service)
  }
  deleteService(id:string):Observable<any>{
    let api = `${this.url}/Service/${id}`
    return this.http.delete<any>(api)
  }
}
