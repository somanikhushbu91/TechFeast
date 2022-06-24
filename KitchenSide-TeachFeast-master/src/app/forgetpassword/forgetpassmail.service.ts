import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgetpassmailService {

  constructor(public _http:HttpClient,private _router:Router) { }


  EmployeeUrl:string="http://localhost:3000/employee/";
  mailurl:string="http://localhost:3000/forgetpassmail/";

sendMail(item){
  console.log(item);
  let body = JSON.stringify(item);
  let h = new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.mailurl,body,{headers:h})
}

// sendMail(email_id, sub, password) {
//   console.log(email_id, sub, password);
//   let body = {
//     "name": email_id,
//     "message": password,
//     "subject": sub
//   }
//   let header = new HttpHeaders().set('Content-Type', 'application/json');
//   return this._http.post(this.mailurl, body, { headers: header });
// }
getDataById(email_id: string) {
  return this._http.get(this.EmployeeUrl + email_id);
}
}
