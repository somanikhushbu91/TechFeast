import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { charity } from './charity';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharityService {
  url:string=environment.url+"charity/";
  deleteUrl:string=environment.url+"charitydelete/";

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
  getDataById(charity_id:number)
  {
    return this._http.get(this.url+charity_id);
  }
  deleteData(charity_id:number)
  {
    return this._http.delete(this.url+charity_id);
  }
  addData(item)
  {
    return this._http.post(this.url,item);
  }
  updateData(item:charity)
  {
    let body=JSON.stringify(item);
    let header=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+item.charity_id,body,{headers:header});
  }
}

