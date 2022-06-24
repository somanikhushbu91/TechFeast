import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupDataService {
  url:string=environment.url+"signup/";
  constructor(private _http:HttpClient) { }
  signupData(item)
  {
    const body=JSON.stringify(item);
    const header=new HttpHeaders().set(environment.header,environment.value);
    return this._http.post(this.url,body,{headers:header});
  }
}
