import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { categoryData } from '../category';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent implements OnInit {

  constructor(private _act_router:ActivatedRoute,private _router:Router,private _category:CategoryService) { }
  cat_id:number;
  updatecategoryform:FormGroup;
  categoryPhotoUrl:string=null;
  selectedfile: File = null;

  ngOnInit() {
    this.cat_id=this._act_router.snapshot.params["cat_id"];
    this.updatecategoryform=new FormGroup({
      cat_name:new FormControl(null,[Validators.required,Validators.pattern('[A-Za-z ]*'),Validators.minLength(3)]),
      Image:new FormControl(null)
    });


    this._category.getDataById(this.cat_id).subscribe(
      (data:categoryData[])=>{
        this.formDataBind(data[0]);
      }
    );
  }

  onChange(f){
    this.selectedfile=<File>f.target.files[0];
  }

  formDataBind(item:categoryData){
    this.categoryPhotoUrl=environment.url+'images/category_images/'+item.Image;
    this.updatecategoryform.patchValue({
      cat_name:item.cat_name,
      Image:item.Image
    });
  }

  onupdatecategory(f){
    console.log(f.value);
    const fd=new FormData();
    fd.append('cat_id',f.value.cat_id);
    fd.append('cat_name',f.value.cat_name);
    if (this.selectedfile!=null){
      fd.append('Image',this.selectedfile,this.selectedfile.name);
    }
    else{
      fd.append('Image',this.updatecategoryform.get('Image').value);
    }

    this._category.updateData(this.cat_id,fd).subscribe(
      (data:categoryData[])=>{
        console.log(data);
        alert("record updated");
        this._router.navigate(['/nav/category']);
      }
    );
  }

  onBackToPage(){
    this._router.navigate(['/nav/category']);
  }
}
