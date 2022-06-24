import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../menu.service';
import { CategoryService } from 'src/app/category/category.service';
import { categoryData } from 'src/app/category/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { menuData } from '../menu';
import { stockData } from 'src/app/stock/stock';
import { StockService } from 'src/app/stock/stock.service';
import { IngredientsDetail } from '../addmenu/ingredientsDetail';
import { MatTableDataSource } from '@angular/material/table';
import { StockMenu } from '../addmenu/stockmenu';

@Component({
  selector: 'app-updatemenu',
  templateUrl: './updatemenu.component.html',
  styleUrls: ['./updatemenu.component.css']
})
export class UpdatemenuComponent implements OnInit {

  constructor(private _router: Router, private _act_router: ActivatedRoute, public _ser: MenuService, public _cat_ser: CategoryService, private _stockData: StockService) { }
  menu_id: number;
  cat_data: categoryData[] = [];
  updatemenuform: FormGroup;
  itemINGREDIENTSNAME: string = "";
  itemINGREDIENTSUnit: number = 0;
  ingredientnamearr: stockData[] = [];
  ingredientunitarr: number[] = [20, 30, 40, 50, 100, 150, 200, 250, 300, 400, 450, 500];
  ingredientsNAMEarr: string[] = [];
  ingredientsobj: stockData;
  itemIngredients: string[] = [];
  itemINGREDIENTSDETAIL: IngredientsDetail[] = [];
  dataSourceOfIngredient = new MatTableDataSource();
  displayedColumnsOfIngredient: string[] = [
    'IngredientName', "IngredientUnit"
  ];
  itemINGREDIENTS: string[] = [];
  INGREDIENTS: string = "";
  ingredientarr: any[] = [];
  isjainArr: string[] = [
    'Jain', 'Non Jain'];
  isavailableArr: string[] = [
    'Available', 'Not Available'];

  ngOnInit() {
    this.menu_id = this._act_router.snapshot.params['menu_id'];
    this.updatemenuform = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z ]*'), Validators.minLength(3)]),
      discription: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z, ]*'), Validators.minLength(3)]),
      price: new FormControl(null, [Validators.required, Validators.maxLength(4)]),
      fk_cat_id: new FormControl(null),
      is_jain: new FormControl(null),
      is_available: new FormControl(null),
      ingredients: new FormControl(null),
    })
    console.log(this.updatemenuform);

    this._cat_ser.getAllData().subscribe(
      (data: any) => {
        this.cat_data = data;
        console.log(this.cat_data);
      }
    );
    this._ser.getDataById(this.menu_id).subscribe(
      (data: any[]) => {
        this.formDataBind(data[0]);
      }
    );

    this._stockData.getAllData().subscribe(
      (data: any) => {
        this.ingredientnamearr = data
        console.log(this.ingredientnamearr);
      }
    );
  }

  formDataBind(item: menuData) {
    this.updatemenuform.patchValue({
      name: item.name,
      discription: item.discription,
      price: item.price,
      fk_cat_id: item.fk_cat_id,
      is_jain: item.is_jain,
      is_available: item.is_available,
      ingredients: item.ingredients
    })
    this._ser.getStockMenuByID(this.menu_id).subscribe(
      (data: any) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.itemINGREDIENTSDETAIL.push(new IngredientsDetail(data[i].stock_id, data[i].title, data[i].itemqty));
        }
        console.log(this.itemINGREDIENTSDETAIL);
        this.dataSourceOfIngredient.data = this.itemINGREDIENTSDETAIL;
      }
    );
  }



  onAddIngredients() {
    let a;
    this.ingredientsobj = this.ingredientnamearr.find(x => x.title == this.itemINGREDIENTSNAME);
    if (this.itemINGREDIENTSDETAIL.find(x => x.stockId == this.ingredientsobj.stock_id)) {
      a = this.itemINGREDIENTSDETAIL.find(x => x.stockId == this.ingredientsobj.stock_id);
      this.itemINGREDIENTSDETAIL.splice(this.itemINGREDIENTSDETAIL.indexOf(a), 1);
    }
    this.itemINGREDIENTSDETAIL.push(new IngredientsDetail(this.ingredientsobj.stock_id, this.itemINGREDIENTSNAME, this.itemINGREDIENTSUnit));
    this.dataSourceOfIngredient.data = this.itemINGREDIENTSDETAIL;
    this.itemINGREDIENTSNAME = "";
    this.itemINGREDIENTSUnit = 0;
  }

  onMenuupdate(f) {
    for (let i = 0; i < this.itemINGREDIENTSDETAIL.length; i++) {
      this.itemINGREDIENTS.push(this.itemINGREDIENTSDETAIL[i].itemINGREDIENTSNAME);
    }
    this.INGREDIENTS = this.itemINGREDIENTS.join(',');
    console.log(this.INGREDIENTS);
    console.log(f.value);
    const fd = new FormData();
    fd.append('name', f.value.name);
    fd.append('discription', f.value.discription);
    fd.append('price', f.value.price);
    fd.append('fk_cat_id', f.value.fk_cat_id);
    fd.append('is_jain', f.value.is_jain);
    fd.append('is_available', f.value.is_available);
    fd.append('ingredients', this.INGREDIENTS);
    alert(fd.getAll('name'));
    this._ser.updateData(this.menu_id, fd).subscribe(
      (data: any[]) => {
        console.log(data);
        alert("Record successfuly updated");
//        this._router.navigate(['/nav/menu']);
        console.log(this.menu_id);
        this._ser.getStockMenuByID(this.menu_id).subscribe(
          (data: any[]) => {
            console.log(data);
            this.ingredientarr = data;
            console.log(this.ingredientarr);
            for (let i = 0; i < this.itemINGREDIENTSDETAIL.length; i++) {
              this.ingredientsobj = this.ingredientnamearr.find(x => x.title == this.itemINGREDIENTSDETAIL[i].itemINGREDIENTSNAME);
              if (this.ingredientarr.find(x => x.stock_id == this.ingredientsobj.stock_id)) {
                console.log("Hello");
                let obj = new StockMenu(this.menu_id, this.itemINGREDIENTSDETAIL[i].stockId, this.itemINGREDIENTSDETAIL[i].itemINGREDIENTSUNIT);
                console.log(this.ingredientarr[i].sm_id);
                this._ser.updateStock(this.ingredientarr[i].sm_id, obj).subscribe(
                  (data: any[]) => {
                    alert("Data Updated successfully");
                  }
                );
              }
              else {
                console.log("Hii");
                let obj = new StockMenu(this.menu_id, this.itemINGREDIENTSDETAIL[i].stockId, this.itemINGREDIENTSDETAIL[i].itemINGREDIENTSUNIT);
                this._ser.addStockMenu(obj).subscribe(
                  (data: any[]) => {
                    alert("Data Succefully added");
                  }
                );
              }
            }
          }
        );
        this._router.navigate(['/nav/menu']);
      }
    );
  }

  onBackToPage() {
    this._router.navigate(['/nav/menu']);
  }
}
