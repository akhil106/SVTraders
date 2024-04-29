import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductTypesComponent } from './product-types/product-types.component';

@Component({
  selector: 'app-content-management',
  standalone: true,
  imports: [MatTabsModule,ProductCategoriesComponent,ProductTypesComponent],
  templateUrl: './content-management.component.html',
  styleUrl: './content-management.component.scss'
})
export class ContentManagementComponent {

}
