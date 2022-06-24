import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuService } from '../menu.service';
import { menuData } from '../menu';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  constructor(private _router:Router,private _act_router:ActivatedRoute,private _menu:MenuService) { }
  menu_id:number;
  updatemenupic:FormGroup;
  menuurl:string=null;
  selectedFile:File=null;

  ngOnInit() {
    this.menu_id=this._act_router.snapshot.params["menu_id"];

    this.updatemenupic=new FormGroup({
      pic:new FormControl(null)
    });
    this._menu.getDataById(this.menu_id).subscribe(
      (data:menuData[])=>{
        this.formDataBind(data[0]);
        console.log(data[0]);
      }
    );
  }

  formDataBind(item:menuData){
    this.menuurl=environment.url+'images/menu_images/'+item.pic;
    console.log(this.menuurl);
    this.updatemenupic.patchValue({
      pic:item.pic,
    });
  }

  onChange(f){
    this.selectedFile=<File>f.target.files[0];
    console.log(this.selectedFile);
  }

  onmenuimageupdate(){

    let fd=new FormData();
    if(this.selectedFile != null) {
     fd.append('pic',this.selectedFile,this.selectedFile.name);
     console.log(this.selectedFile.name);
    }
    else{
      fd.append('pic',this.updatemenupic.get('pic').value);
      console.log(this.updatemenupic.get('pic').value);
    }

    this._menu.updateImage(this.menu_id,fd).subscribe(
      (data:menuData)=>{
        console.log(data)
        alert("Successfully edited");
        this._router.navigate(['/nav/menu']);
      }
    );
  }

  onBackToPage(){
    this._router.navigate(['/nav/menu']);
  }

}
