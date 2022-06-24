import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoryData } from '../category';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  category_list: categoryData[] = [];

  constructor(private _category: CategoryService, private _router: Router) { }
  addcategoryform: FormGroup;
  selectedFile: File = null;
  ngOnInit() {
    this.addcategoryform = new FormGroup({
      cat_name: new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z ]*'), Validators.minLength(3)]),
      Image: new FormControl(null)
    })
    this._category.getAllData().subscribe(
      (data: any[]) => {
        this.category_list = data;
        console.log(this.category_list);
      }
    );
  }

  base64textString = [];


  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
    console.log(this.selectedFile);

    const file = f.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);

      console.log(this.base64textString);
    }

  }

  onCategoryAdd(f) {
    let fd = new FormData();
    fd.append('cat_id', f.value.cat_id);
    fd.append('cat_name', f.value.cat_name);
    fd.append('Image', this.selectedFile, this.selectedFile.name);

    console.log(f.value.Image);
    console.log(f.value.cat_name);
    if (this.category_list.find(x => x.cat_name == f.value.cat_name)) {
      alert("Already Exists");
    }
    else {
      this._category.addData(fd).subscribe(
        (data: any[]) => {
          alert("Data properly added");
          this._router.navigate(['/nav/category']);
        }
      );
    }
  }

  onBackToPage() {
    this._router.navigate(['/nav/category']);
  }
}
