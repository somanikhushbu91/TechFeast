import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogindataService {
  url:string=environment.url+"login/";
  constructor(private _http:HttpClient) { }
  loginData(item)
  {
    const body=JSON.stringify(item);
    const header = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url,body,{headers:header});
  }
}
