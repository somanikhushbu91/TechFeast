import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDataService {

  url:string="http://localhost:3000/paymentstatus/"
  constructor(private _http:HttpClient) { }

  updateStatus(order_id){
    console.log(order_id);
    return this._http.get(this.url+order_id);
  }
}
