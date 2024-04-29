import { Component } from '@angular/core';
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
  selector: 'app-customer-list',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {

  form: FormGroup = new FormGroup({
    productName: new FormControl(''),
    productCategoryId: new FormControl(''),
    productTypeId: new FormControl(''),
    color: new FormControl(''),
    productImage: new FormControl(null),
    price: new FormControl(''),
    // confirmPassword: new FormControl(''),
    // acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,private sharedService:SharedService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        productName: ['', Validators.required],
        productCategoryId:  ['', Validators.required],
        productTypeId:  ['', Validators.required],
        color: ['', [Validators.required]],
        productImage: [null],
        price: ['', Validators.required],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]; // Get the file
    // let formData = new FormData();
    // formData.append('file', file);
    console.log(file);
    this.form.patchValue({
      productImage: file

    });
    this.form.get('productImage')?.setValue(file.name);  // Set the file to the form control
}

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));

    this.sharedService.createProductList(this.form.value).subscribe((data) => {
      console.log('data:: ', data);
      
    }, (err) => {
      console.log('err:: ', err);
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
