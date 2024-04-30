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
import { ProductTypeModalComponent } from '../../modals/product-type-modal/product-type-modal.component';

@Component({
  selector: 'app-product-types',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule,MatFormFieldModule, MatInputModule,MatIconModule],
  templateUrl: './product-types.component.html',
  styleUrl: './product-types.component.scss'
})
export class ProductTypesComponent implements AfterViewInit {

  ELEMENT_DATA: PeriodicElement[] = [];

displayedColumns: string[] = ['position', 'productType', 'productCategoryName', 'Action'];
dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

@ViewChild(MatPaginator) paginator: any;
@ViewChild(MatSort) sort: any;

  constructor(public dialog: MatDialog,private sharedService:SharedService) {}

  ngOnInit(): void {
    this.getProductTypes()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProductTypes(){
    this.sharedService.getProductTypeList().subscribe((data) => {
      if(data.response.productTypes){
        this.ELEMENT_DATA = [];
        for (let index = 0; index < data.response.productTypes.length; index++) {
          const element = data.response.productTypes[index];
          let obj = { position: index+1, productType: element.productType,productCategoryName: element.productCategoryName, productCategoryId: element.productCategoryId, productTypeId: element._id}
          this.ELEMENT_DATA.push(obj);
        }
        this.dataSource.data = this.ELEMENT_DATA;
      }
    }, (err) => {
      console.log('err:: ', err);
    });
  }
  onEdit(data:any){
    if(data){
      let updatedData = this.dataSource.data.filter((item) => item.productTypeId == data.productTypeId);
      console.log(updatedData);
      
      this.openDialog('Edit', updatedData);
    }
  }

  onDelete(id:any){
    this.sharedService.deleteProductTypeList(id.productTypeId).subscribe((data) => {
      this.getProductTypes();
    }, (err) => {
      console.log('err:: ', err);
    });
  }

  openDialog(name:string,data?:any) {
    const dialogRef = this.dialog.open(ProductTypeModalComponent, {
      data: { name: name, data: data},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getProductTypes();
    });
  }
  
}
export interface PeriodicElement {
  position: number;
  productType: string;
  productCategoryId: string;
  productCategoryName: string;
  productTypeId: string;
}