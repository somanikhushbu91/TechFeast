import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ChatboatDataService {
private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
private token: string = "184811acb7b3413eb0e5562eb22b5112";
  constructor(public http: Http){}
  public getResponse(query: string){
  let data = {
    query : query,
    lang: 'en',
    sessionId: '1234567'
  }
  let headers = new Headers();
  headers.append('Authorization', `Bearer ${this.token}`);
  return this.http
    .post(`${this.baseURL}`, data, {headers: headers})
    .map(res => {
      return res.json()
    })
  }
}
