import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import { ProductListModalComponent } from '../../modals/product-list-modal/product-list-modal.component';
import { SharedService } from '../../sharedService/shared.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule,MatFormFieldModule, MatInputModule,MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements AfterViewInit  {

  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: "Hydrogen", price: 1.0079, productColor: "H", count: 8, productCategoryId: "A1", productTypeId: "X" },
    { position: 2, name: "Helium", price: 4.0026, productColor: "He", count: 15, productCategoryId: "B2", productTypeId: "Y" },
    { position: 3, name: "Lithium", price: 6.941, productColor: "Li", count: 5, productCategoryId: "C3", productTypeId: "Z" },
    { position: 4, name: "Beryllium", price: 9.0122, productColor: "Be", count: 10, productCategoryId: "D4", productTypeId: "X" },
    { position: 5, name: "Boron", price: 10.811, productColor: "B", count: 18, productCategoryId: "E5", productTypeId: "Y" },
    { position: 6, name: "Carbon", price: 12.0107, productColor: "C", count: 3, productCategoryId: "F6", productTypeId: "Z" },
    { position: 7, name: "Nitrogen", price: 14.0067, productColor: "N", count: 20, productCategoryId: "G7", productTypeId: "X" },
    { position: 8, name: "Oxygen", price: 15.9994, productColor: "O", count: 9, productCategoryId: "H8", productTypeId: "Y" },
    { position: 9, name: "Fluorine", price: 18.9984, productColor: "F", count: 11, productCategoryId: "I9", productTypeId: "Z" },
    { position: 10, name: "Neon", price: 20.1797, productColor: "Ne", count: 14, productCategoryId: "J10", productTypeId: "X" },
    { position: 11, name: "Sodium", price: 22.9897, productColor: "Na", count: 7, productCategoryId: "K11", productTypeId: "Y" },
    { position: 12, name: "Magnesium", price: 24.305, productColor: "Mg", count: 16, productCategoryId: "L12", productTypeId: "Z" },
    { position: 13, name: "Aluminum", price: 26.9815, productColor: "Al", count: 4, productCategoryId: "M13", productTypeId: "X" },
    { position: 14, name: "Silicon", price: 28.0855, productColor: "Si", count: 13, productCategoryId: "N14", productTypeId: "Y" },
    { position: 15, name: "Phosphorus", price: 30.9738, productColor: "P", count: 19, productCategoryId: "O15", productTypeId: "Z" },
    { position: 16, name: "Sulfur", price: 32.065, productColor: "S", count: 6, productCategoryId: "P16", productTypeId: "X" },
    { position: 17, name: "Chlorine", price: 35.453, productColor: "Cl", count: 17, productCategoryId: "Q17", productTypeId: "Y" },
    { position: 18, name: "Argon", price: 39.948, productColor: "Ar", count: 2, productCategoryId: "R18", productTypeId: "Z" },
    { position: 19, name: "Potassium", price: 39.0983, productColor: "K", count: 22, productCategoryId: "S19", productTypeId: "X" },
    { position: 20, name: "Calcium", price: 40.078, productColor: "Ca", count: 1, productCategoryId: "T20", productTypeId: "Y" }
  ];

displayedColumns: string[] = ['position', 'name', 'price', 'productColor', 'count', 'productCategoryId', 'productTypeId', 'Action'];
dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

@ViewChild(MatPaginator) paginator: any;
@ViewChild(MatSort) sort: any;

  constructor(public dialog: MatDialog,private sharedService:SharedService) {}

  ngOnInit(): void {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductListModalComponent, {
      data: { name: 'Add' },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
export interface PeriodicElement {
  name: string;
  position: number;
  price: number;
  productColor: string;
  productCategoryId: string;
  productTypeId: string;
  count: number;
}