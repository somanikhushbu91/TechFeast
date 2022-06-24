import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { order_detail } from './order_detail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailDataService {
  url:string=environment.url+"orderdetails/";
  deleteUrl:string=environment.url+"orderdetailsdelete/";

  private orderDetail: string = environment.url + 'orderDetails/';

  constructor(private _http:HttpClient) { }
  getAllData()
  {
    return this._http.get(this.url);
  }
  deleteData(order_detail_id:order_detail)
  {
    return this._http.delete(this.url+order_detail_id);
  }
  deleteAll(item:number[]){

    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
  getOrderDetailsByOrderId(order_id) {
    return this._http.get(this.orderDetail + order_id);
  }
}
