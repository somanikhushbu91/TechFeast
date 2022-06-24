import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http:HttpClient) { }
  url:string=environment.url+"cart/";
  deleteUrl:string=environment.url+"cartdelete/";



  getAllData()
  {
    return this._http.get(this.url);
  }
  deleteData(cart_id:number)
  {
    return this._http.delete(this.url+cart_id);
  }
  deleteAll(item:number[]){

    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
}
