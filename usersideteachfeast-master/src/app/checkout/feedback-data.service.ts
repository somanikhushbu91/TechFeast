import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {

  url:string="http://localhost:3000/feedback/"

  constructor(private _http:HttpClient) { }

  addFeedBack(item:FormData){
    console.log(item);
    return this._http.post(this.url,item);
  }
}
