import { Routes } from '@angular/router';

export const routes: Routes = [
    // { path: 'gis', component: GismapComponent },
    { path: 'products', loadComponent: () => import('./components/product-list/product-list.component').then(c => c.ProductListComponent)},
    { path: 'customers', loadComponent: () => import('./components/customer-list/customer-list.component').then(c => c.CustomerListComponent)},
    { path: 'contentManagement', loadComponent: () => import('./contentManageent/content-management.component').then(c => c.ContentManagementComponent)},
    { path: '', redirectTo: 'products',pathMatch: 'full'},
];
