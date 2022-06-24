import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KitchenDataServiceService {

  constructor(private _http:HttpClient) { }

  url:string=environment.url+"kitchenSide/";
  url1:string=environment.url+"order/";
  url2:string=environment.url+"stockMenuId/";
  url3:string=environment.url+"stockDecrese/";
  url4:string=environment.url+"stock/"
  deleteUrl:string=environment.url+"orderdetailsdelete/";

  getAllData(){
    return this._http.get(this.url);
  }
  updateData(order_id,item){
    console.log(item);
    let body=JSON.stringify(item);
    let header=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url1+order_id,body,{headers:header});
  }
  getMultipleData(order_id){
    return this._http.get(this.url1+order_id);
  }
  getMultipleMenuId(order_id){
    console.log(order_id);
    return this._http.get(this.url2+order_id);
  }
  getIngredientsDataForMenuID(menu_id){
    console.log(menu_id);
    return this._http.get(this.url3+menu_id);
  }
  updateStock(stock_id,item,item1){
    console.log(item);
    let body=JSON.stringify(item1);
    console.log(body);
    let header=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url4+stock_id+'/'+item,body,{headers:header});
  }
  deleteAll(item:number[]){

    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
  deleteData(order_id){
    return this._http.delete(this.url1+order_id);
  }
}
