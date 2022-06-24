import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  url:string=environment.url+"order/";
  url1:string="http://localhost:3000/orderByStatus/";
  url2:string="http://localhost:3000/paymentstatus/"
  deleteUrl:string=environment.url+"orderdelete/";
  monthlypayment:string="http://localhost:3000/monthlypayment/";
  highestselling:string="http://localhost:3000/highestsellingitem/";
  invoice_url1:string="http://localhost:3000/invoice_mode/";
  daily_orders_count:string="http://localhost:3000/getDailyOrder/"

  constructor(private _http:HttpClient) { }
  getAllData()
  {
    return this._http.get(this.url);
  }
  deleteData(order_id){
    return this._http.delete(this.url+order_id);
  }
  deleteAll(item:number[]){

    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
  getMultipleData(order_id){
    return this._http.get(this.url+order_id);
  }
  getMonthlyPayment()
  {
    return this._http.get(this.monthlypayment);
  }
  getHighestSellingItem()
  {
    return this._http.get(this.highestselling);
  }
  getOrderByStatus(status)
  {
    console.log("majama");
    return this._http.get(this.url1+status);
  }
  getInvoiceByMode(PaymentMODE)
  {
    return this._http.get(this.invoice_url1+PaymentMODE);
  }
  gatDailyOrderCount(){
    return this._http.get(this.daily_orders_count);
  }
  updatepaymentstatus(order_id){
    return this._http.get(this.url2+order_id);
  }
}
