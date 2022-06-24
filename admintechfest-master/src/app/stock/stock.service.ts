import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stockData } from './stock';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  url:string=environment.url+"stock/";
  deleteUrl:string=environment.url+"stockdelete/";
  constructor(private _http:HttpClient) { }

  deleteAll(item:number[]){

    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }


  getAllData()
  {
    return this._http.get<stockData[]>(this.url);
  }
  deleteData(stock_id:number)
  {
    return this._http.delete(this.url+stock_id);
  }
  addData(item)
  {
    return this._http.post(this.url,item);
  }
}
