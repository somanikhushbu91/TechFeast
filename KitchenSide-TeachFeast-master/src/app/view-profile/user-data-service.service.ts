import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  constructor(private _http:HttpClient) { }
  url:string="http://localhost:3000/employee/";

  getuserByid(email_id:string)
  {
    return this._http.get(this.url+email_id);
  }

}
