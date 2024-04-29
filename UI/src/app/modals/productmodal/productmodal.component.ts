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
  selector: 'app-productmodal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,ReactiveFormsModule,CommonModule],
  templateUrl: './productmodal.component.html',
  styleUrl: './productmodal.component.scss'
})
export class ProductmodalComponent {

  title:any;
  form: FormGroup = new FormGroup({
    productName: new FormControl(''),
    productCategoryId: new FormControl(''),
    productTypeId: new FormControl(''),
    color: new FormControl(''),
    productImage: new FormControl(null),
    price: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {name: string},
    private sharedService:SharedService) {
     this.title = data.name;
    }

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