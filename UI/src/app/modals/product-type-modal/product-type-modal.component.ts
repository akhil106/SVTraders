import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../sharedService/shared.service';

@Component({
  selector: 'app-product-type-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,ReactiveFormsModule,CommonModule],
  templateUrl: './product-type-modal.component.html',
  styleUrl: './product-type-modal.component.scss'
})
export class ProductTypeModalComponent {

  title:any;
  updatedData:any;

  form: FormGroup = new FormGroup({
    productType: new FormControl(''),
    productCategoryId: new FormControl(''),
  });
  submitted = false;
  closeDialog = false;
  productCategoryList = [];

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {name: string, data: any},
    private sharedService:SharedService) {
     this.title = data.name;
     this.updatedData = data.data && data.data[0];
    }

  ngOnInit(): void {
    this.getProductCategories();
    this.form = this.formBuilder.group(
      {
        productType: ['', Validators.required],
        productCategoryId:  ['', Validators.required],
      }
    );
    if(this.title === 'Edit' ){
      this.form.get('productType')?.setValue(this.updatedData.productType);
      this.form.get('productCategoryId')?.setValue(this.updatedData.productCategoryId);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getProductCategories(){
    this.sharedService.getProductCategoryList().subscribe((data) => {
      if(data.response.productCategories){
          this.productCategoryList = data.response.productCategories;
      }
    }, (err) => {
      console.log('err:: ', err);
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    if(this.title === 'Edit' ){
      this.sharedService.updateProductTypeList(this.form.value,this.updatedData.productTypeId).subscribe((data) => {
        console.log('data:: ', data);
      }, (err) => {
        console.log('err:: ', err);
      });
    }else{
      this.sharedService.createProductTypeList(this.form.value).subscribe((data) => {
        console.log('data:: ', data);
        this.closeDialog = true;
      }, (err) => {
        console.log('err:: ', err);
      });
    }

   
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}