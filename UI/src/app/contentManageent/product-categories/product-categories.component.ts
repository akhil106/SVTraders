import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import { SharedService } from '../../sharedService/shared.service';
import { ProductCategoriesModalComponent } from '../../modals/product-categories-modal/product-categories-modal.component';

@Component({
  selector: 'app-product-categories',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule,MatFormFieldModule, MatInputModule,MatIconModule],
  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.scss'
})
export class ProductCategoriesComponent {

ELEMENT_DATA: PeriodicElement[] = [];
displayedColumns: string[] = ['position', 'productCategoryName', 'Action'];
dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

@ViewChild(MatPaginator) paginator: any;
@ViewChild(MatSort) sort: any;

  constructor(public dialog: MatDialog,private sharedService:SharedService) {}

  ngOnInit(): void {
    this.getProductCategories();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getProductCategories(){
    this.sharedService.getProductCategoryList().subscribe((data) => {
      if(data.response.productCategories){
        this.ELEMENT_DATA = [];
        for (let index = 0; index < data.response.productCategories.length; index++) {
          const element = data.response.productCategories[index];
          let obj = { position: index+1, productCategoryName: element.productCategoryName, productCategoryId: element._id}
          this.ELEMENT_DATA.push(obj)
        }
        this.dataSource.data = this.ELEMENT_DATA;
      }
    }, (err) => {
      console.log('err:: ', err);
    });
  }

  onEdit(data:any){
    if(data){
      let updatedData = this.dataSource.data.filter((item) => item.productCategoryId == data.productCategoryId);
      this.openDialog('Edit', updatedData);
    }
  }

  onDelete(id:any){
    this.sharedService.deleteProductCategoryList(id.productCategoryId).subscribe((data) => {
      this.getProductCategories();
    }, (err) => {
      console.log('err:: ', err);
    });
  }

  openDialog(name:string,data?:any) {
    const dialogRef = this.dialog.open(ProductCategoriesModalComponent, {
      data: { name: name ,data: data},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getProductCategories();
    });
  }
  
}
export interface PeriodicElement {
  position: number;
  productCategoryName: string;
  productCategoryId: string;
}