import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  getAllReport(){
    const api ="https://localhost:7232/api/Report"
    return this.http.get<any>(api);
  }

  addReport(data:any){
    const api ="https://localhost:7232/api/Report"
    return this.http.post<any>(api,data);
  }

 
}
