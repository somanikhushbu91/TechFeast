import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { vendorData } from './vendor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  url:string=environment.url+"vendor/";
  deleteUrl:string=environment.url+"vendordelete/";
  constructor(private _http:HttpClient) { }

  deleteAll(item:number[]){

    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }

  getAllData()
  {
      return this._http.get(this.url);
  }
  getDataById(vendor_id:number)
  {
    return this._http.get(this.url+vendor_id);
  }
  deleteData(vendor_id:number)
  {
    return this._http.delete(this.url+vendor_id);
  }
  addData(item)
  {
    console.log(item);
    let body=JSON.stringify(item);
    let header=new HttpHeaders().set('Content-type','application/json');
    return this._http.post(this.url,body,{headers:header});
  }
  updateData(item:vendorData)
  {
    console.log(item);
    let body=JSON.stringify(item);
    let header=new HttpHeaders().set('Content-type','application/json');
    return this._http.put(this.url+item.vendor_id,body,{headers:header});
  }
  }
