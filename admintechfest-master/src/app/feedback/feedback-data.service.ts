import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackDataService {

  constructor(private _http:HttpClient) { }
  private url:string="http://localhost:3000/feedbackcount/";
  private url1:string=environment.url+"feedback/";

  getAllFeedbackCount(){
    return this._http.get(this.url);
  }
  getAllFeedback()
  {
    return this._http.get(this.url1);
  }
  deleteFeedback(feedback_id:number)
  {
    return this._http.delete(this.url1+feedback_id);
  }
}
