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
  selector: 'app-product-categories-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,ReactiveFormsModule,CommonModule],
  templateUrl: './product-categories-modal.component.html',
  styleUrl: './product-categories-modal.component.scss'
})
export class ProductCategoriesModalComponent {

  title:any;
  updatedData:any;
  form: FormGroup = new FormGroup({
    productCategoryName: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {name: string, data: any},
    private sharedService:SharedService) {
     this.title = data.name;
     this.updatedData = data.data && data.data[0];
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        productCategoryName:  ['', Validators.required],
      }
    );
    if(this.title === 'Edit' ){
      this.form.get('productCategoryName')?.setValue(this.updatedData.productCategoryName);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    if(this.title === 'Edit' ){
      this.sharedService.updateProductCategoryList(this.form.value,this.updatedData.productCategoryId).subscribe((data) => {
        console.log('data:: ', data);
      }, (err) => {
        console.log('err:: ', err);
      });
    }else{
      this.sharedService.createProductCategoryList(this.form.value).subscribe((data) => {
        console.log('data:: ', data);
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