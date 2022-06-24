import { Component, OnInit, ViewChild } from '@angular/core';
import { CharityService } from '../charity/charitydata.service';
import { charity } from '../charity/charity';
import { Chart } from "Chart.js";
import { OrderDataService } from '../order/order-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MenuService } from '../menu/menu.service';
import { categoryData } from '../category/category';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from '../category/category.service';
import { Sendemail } from './sendemailHome';
import { CharitymailDataService } from '../charity/charitymail/charitymail-data.service';
import { charitymaildata } from '../charity/charitymail/charitymail';
import { orderdata } from '../order/order';
import { timer } from 'rxjs';
import { FeedbackDataService } from '../feedback/feedback-data.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  sellingpie=[];
  charity: charity[] = [];
  order:orderdata[]=[];
  monthlypaymenttimer: any;
  monthlypayment=[];
  highestSellingColumns:string[]=['ItemNAME','QTY'];
  highestselling=new MatTableDataSource();
  highestsellingtimer:any;
  monthlysellingtimer:any;
  todaypaytimer:any;
  totalother:number=0;
  totalcash:number=0;
  totalcard:number=0;
  paymentchartflag:boolean;
  flag:boolean=true;
  catarr:categoryData[]=[];
  monthlyselling=[];
  timeinterval:any;
  displayedColumns:string[]=["item","qty","price","tableNo"];
  dailyOrders:number=0;
  totalDaily:number=0;
  allFeedbacks:number=0;
  totalMonthlySell:number=0;

  constructor(private _mail:CharitymailDataService,private _route:Router,private _charityser: CharityService,private _item:MenuService ,private _invser: OrderDataService,private _cat:CategoryService,private _feedback:FeedbackDataService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.highestselling.sort = this.sort;
    this._cat.getAllData().subscribe(
      (data:categoryData[])=>{
        this.catarr=data;
      }
    );
    this.getAllOrder();
    this.oncharity();
    this.represhdata();
    this.gatAllDailyOrder();
    this.getAllFeedbackCount();

    setTimeout(() => {
      this.ngOnInit();
      this.totalMonthlySell=0;
    }, 60000);
  }

  ngOnDestroy(){
    if(this.todaypaytimer)
    {
      this.todaypaytimer.unsubscribe();
    }
    if(this.monthlypaymenttimer){
      this.monthlypaymenttimer.unsubscribe();
    }
    if(this.monthlysellingtimer){
      this.monthlysellingtimer.unsubscribe();
    }
    if(this.highestsellingtimer){
      this.highestsellingtimer.unsubscribe();
    }
    this.flag==false;
  }

  subscriptiondata(){
    if(this.flag){
      this.timeinterval=timer(10000).subscribe(()=>this.represhdata());
    }

  }

  private represhdata(): void {
    console.log("helllo");
    this.onTodayPay();
    this.onmonthlyselling();
    this.onMonthlyPayment();
    this.onHighestSellingProduct();
    //  this.subscriptiondata();
  }

  onclick(){
    this._route.navigate(['nav/order']);
  }

  getAllOrder(){
    console.log("call from")
    this._invser.getOrderByStatus("Order").subscribe(
      (data:any)=>{
        this.order=data;
        this.dataSource.data=this.order;
      }
    )
  }

  gatAllDailyOrder(){
    this._invser.gatDailyOrderCount().subscribe(
      (data:number)=>{
        console.log(data[0].total);
          this.dailyOrders=data[0].total;
      }
    );
  }

  getAllFeedbackCount(){
    this._feedback.getAllFeedbackCount().subscribe(
    (data:any)=>{
        this.allFeedbacks=data[0].total;
    });
  }

  oncharity() {
    this._charityser.getAllData().subscribe(
      (data: any) => {
        console.log(data);
        this.charity = data;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   onsend(item){
    let data=new Sendemail(item,"Esplendido Cafe","Collect the leftover Food");
    this._mail.generatemail(data).subscribe(
      (data:charitymaildata[])=>{
        alert("mail is send successfully");
      }
    );
  }

  onTodayPay()
  {
    this.todaypaytimer=this._invser.getInvoiceByMode("card").subscribe(
      (data:any)=>{
        //console.log(data);
        if(data[0].total){
          this.totalcard=data[0].total;
        }
        else{
          this.totalcard=0;
        }
       console.log(this.totalcard);
      }
    );
    this._invser.getInvoiceByMode("other").subscribe(
      (data:any)=>{
        //console.log(data);
        if(data[0].total){
          this.totalother=data[0].total;
        }
        else{
          this.totalother=0;
        }
       console.log(this.totalcard);
      }
    );
    this._invser.getInvoiceByMode("cash").subscribe(
      (data:any)=>{
        console.log(data);
        if(data[0].total){
          this.totalcash=data[0].total;
        }
        else{
          this.totalcash=0;
        }
        console.log(this.totalcash);
        if(this.totalcard==0 && this.totalcash==0 && this.totalother==0){
          console.log("hello");
          this.paymentchartflag=true;
        }
        else{
          this.paymentchartflag=false;
        }
        this.totalDaily=this.totalcard+this.totalcash+this.totalother;
        this.sellingpie=new Chart('canvas1',{
          type:'pie',
          data:{
            labels:[
              'CARD',
              'CASH',
              'OTHER'
            ],
            datasets:[
              {
              data:[this.totalcard,this.totalcash,this.totalother],
              backgroundColor:['rgba(0,200,0,100)','rgba(255,90,0,40)','rgba(0,0,255,50)']
            },

          ]
          },
          options:{
            reponsive:true
          }
        });
      }
    );
  }

  onMonthlyPayment() {
    this.monthlypaymenttimer = this._invser.getMonthlyPayment().subscribe(
      (data: any) => {
        console.log(data);
        let mode = [];
        let payment = [];
        for (let i = 0; i < data.length; i++) {
          mode.push(data[i].payment_type);
          payment.push(data[i].total);
          this.totalMonthlySell+=data[i].total;
        }
        this.monthlypayment = new Chart('canvas3', {
          type: 'bar',
          data: {
            labels: mode,
            datasets: [
              {
                label: 'Monthly Payments',
                data: payment,
                backgroundColor: 'rgba(200,0,150,100)',
                borderWidth: 1,
              },
            ]
          },
          options: {
            reponsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }],
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Payment Mode'
                }
              }]
            }

          }
        });
      }
    );
  }

  onHighestSellingProduct(){
    this.highestsellingtimer=this._invser.getHighestSellingItem().subscribe(
      (data:any)=>{
        let arr=[];
        arr=data;
        this.highestselling.data=arr;
      }
    );
  }

  onmonthlyselling()
  {
      this.monthlysellingtimer=this._item.MonthlySellingCategoryWise().subscribe(
        (data:any) => {
          console.log(data);
          var name=[];
          var cnt=[];
          let flag=0
          for(let i=0;i<this.catarr.length;i++){
            flag=0;
           for(let j=0;j<data.length;j++){
            if(this.catarr[i].cat_name==data[j].cat_name){

              name.push(this.catarr[i].cat_name);
              cnt.push(data[j].count);
               flag=1;
               break
             }
           }
           if(flag==0){
            name.push(this.catarr[i].cat_name);
            cnt.push(0);
           }
          }
          //console.log(cnt);
          this.monthlyselling=new Chart('canvas2',{
              type:'bar',
              data:{
                labels:name,
                datasets:[
                  {
                  label:'Monthly sold items',
                  data:cnt,
                  backgroundColor:'rgba(200,200,0,40)',
                  borderWidth:1
                },
              ]
              },
              options:{
                reponsive:true,
                scales:{
                  yAxes:[{
                      ticks:{
                        beginAtZero:true
                      }
                  }],
                  xAxes:[{
                    display:true,
                    scaleLabel:{
                      display:true,
                      labelString:'Category Name'
                    }
                  }]
                }

              }
          });
        });
  }
}
