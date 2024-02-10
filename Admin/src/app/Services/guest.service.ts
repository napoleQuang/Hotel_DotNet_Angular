import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Guest } from '../Models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  url = environment.url
  constructor(private http:HttpClient) { }

  getGuestByRoomId(roomId: string):Observable<Guest>{
    let api = `${this.url}/Guest/GetGuestByRoom?IDRoom=${roomId}`
    return this.http.get<Guest>(api)
  }

  getGuestById(id: string):Observable<Guest>{
    let api = `${this.url}/Guest/${id}`
    return this.http.get<Guest>(api)
  }

}
