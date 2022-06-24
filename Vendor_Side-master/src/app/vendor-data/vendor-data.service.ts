import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorDataService {
  url:string=environment.url+"vendorSideData/";
  url1:string=environment.url+"ordertovendor/";
  url2:string=environment.url+"deliveryStatus/";
  url3:string=environment.url+"stock/";
  url4:string=environment.url+"stockUpdateByVendor/";
  url5:string=environment.url+"vendorEmail/";
  mailurl:string="http://localhost:3000/forgetpassmail/";
  constructor(private _http:HttpClient) { }

  getData(vendor_id){
    return this._http.get(this.url+vendor_id);
  }
  getDataById(vendor_id){
    return this._http.get(this.url5+vendor_id);
  }
  updateData(vendor_id,item){
    let body=JSON.stringify(item);
    let header=new HttpHeaders().set('Content-type','application/json');
    return this._http.put(this.url1+vendor_id,body,{headers:header});
  }
  updateStatus(vendor_id){
    return this._http.get(this.url2+vendor_id);
  }
  getStockDetail(title){
    console.log(title);
    return this._http.get(this.url3+title);
  }
  updateStock(stock_id,item){
    let body=JSON.stringify(item);
    let header=new HttpHeaders().set('Content-type','application/json');
    return this._http.put(this.url4+stock_id,item,{headers:header});
  }

  sendMail(item){
    console.log(item);
    let body = JSON.stringify(item);
    let h = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.mailurl,body,{headers:h})
  }
}
