import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { orderToVendor } from './orderToVendor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderToVendorService {

  url:string=environment.url+"ordertovendor/";
  deleteUrl:string=environment.url+"orderToVendordelete/";
  deliveredUrl:string=environment.url+"ordertovendorbytypedelivered/";
  notdeliveredUrl:string=environment.url+"ordertovendorbytypenotdelivered/";

  constructor(private _http:HttpClient) { }

  deleteAll(item:number[]){

    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
  getDelivered(){
    return this._http.get<orderToVendor[]>(this.deliveredUrl);
  }
  getNotDelivered()
  {
    return this._http.get<orderToVendor[]>(this.notdeliveredUrl);
  }
  getAllData()
  {
    return this._http.get<orderToVendor[]>(this.url);
  }
  deleteData(ven_order_id:number)
  {
    return this._http.delete(this.url+ven_order_id);
  }
  addData(item){
    return this._http.post(this.url,item);
  }
}
