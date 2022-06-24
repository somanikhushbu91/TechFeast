import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category/category.service';
import { MenuService } from '../menu.service';
import { categoryData } from 'src/app/category/category';
import { Router } from '@angular/router';
import { menuData } from '../menu';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stockData } from 'src/app/stock/stock';
import { StockService } from 'src/app/stock/stock.service';
import { IngredientsDetail } from './ingredientsDetail';
import { MatTableDataSource } from '@angular/material/table';
import { StockMenu } from './stockmenu';


@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddmenuComponent implements OnInit {

  constructor(public _catData:CategoryService,private _menuData:MenuService,private _router:Router,private _stockData:StockService) { }

  selected:string;
  cat_data:categoryData[]=[];
  selectedFile:File=null;
  addmenuform:FormGroup;
  itemINGREDIENTSNAME:string="";
  ingredientnamearr:stockData[]=[];
  itemINGREDIENTSUnit:number=0;
  ingredientunitarr:number[]=[20,30,40,50,100,150,200,250,300,400,450,500];
  ingredientsobj:stockData;
  itemIngredients:string[]=[];
  itemQuantity:number[]=[];
  itemINGREDIENTSDETAIL:IngredientsDetail[]=[];
  itemINGREDIENTS:string="";
  dataSourceOfIngredient=new MatTableDataSource();
  displayedColumnsOfIngredient:string[]=[
    'IngredientName',"IngredientUnit"
  ];
  isjainArr:string[]=[
    'Jain','Non Jain'];
  isavailableArr:string[]=[
      'Available','Not Available'];

  ngOnInit() {
    this.addmenuform=new FormGroup({
      name:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      discription:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z, ]*'),Validators.minLength(3)]),
      price:new FormControl(null,[Validators.required,Validators.maxLength(3),Validators.pattern('[0-9]*')]),
      fk_cat_id:new FormControl(null),
      is_jain:new FormControl(null),
      is_available:new FormControl(null),
      ingredients:new FormControl(null),
      pic:new FormControl(null)
  })
    this._catData.getAllData().subscribe(
      (data:any[])=>{
        this.cat_data=data;
      }
    );

    this._stockData.getAllData().subscribe(
      (data:any)=>{
        this.ingredientnamearr=data
      }
    );

  }

  base64textString = [];

  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

  onMenuAdd(f)
  {
    this.itemINGREDIENTS=this.itemIngredients.join(',');
    console.log(this.itemIngredients);
    let fd=new FormData();
    fd.append('menu_id',f.value.menu_id);
    fd.append('name',f.value.name);
    fd.append('discription',f.value.discription);
    fd.append('price',f.value.price);
    fd.append('fk_cat_id',f.value.fk_cat_id);
    fd.append('is_jain',f.value.is_jain);
    fd.append('is_available',f.value.is_available);
    fd.append('ingredients',this.itemINGREDIENTS);
    fd.append('pic',this.selectedFile,this.selectedFile.name);
    let fk_menu_id = 0;
    this._menuData.addData(fd).subscribe(
      (data:any)=>{
        alert("Data added successfully");
        console.log(data);
        fk_menu_id=data.insertId;
        console.log(fk_menu_id);
      },
      (err)=>{}
      ,()=>{
          for (let i = 0; i < this.itemIngredients.length; i++) {
            let obj= new StockMenu(fk_menu_id,this.itemINGREDIENTSDETAIL[i].stockId,this.itemINGREDIENTSDETAIL[i].itemINGREDIENTSUNIT);
            this._menuData.addStockMenu(obj).subscribe(
              (data:any[])=>{
                console.log(data);
                alert("Data Successully Added");
              }
            );
          }
          this._router.navigate(['/nav/menu']);
      }
    );
  }

  onAddIngredients(){
    this.ingredientsobj=this.ingredientnamearr.find(x=>x.title==this.itemINGREDIENTSNAME);
    console.log(this.ingredientsobj);
    this.itemIngredients.push(this.ingredientsobj.title);
    console.log(this.itemIngredients);
    this.itemQuantity.push(this.itemINGREDIENTSUnit);
    console.log(this.itemQuantity);
    this.itemINGREDIENTSDETAIL.push(new IngredientsDetail(this.ingredientsobj.stock_id,this.itemINGREDIENTSNAME,this.itemINGREDIENTSUnit));
    this.dataSourceOfIngredient.data=this.itemINGREDIENTSDETAIL;
    this.ingredientnamearr.splice(this.ingredientnamearr.indexOf(this.ingredientsobj),1);
  }

  onChange(f){
    this.selectedFile=<File>f.target.files[0];

    console.log(this.selectedFile);

    const file = f.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);

      console.log(this.base64textString);
    }

  }

  onBackToPage(){
    this._router.navigate(['/nav/menu']);
  }

}
