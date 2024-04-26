import { Routes } from '@angular/router';
import { GismapComponent } from './gismap/gismap.component';

export const routes: Routes = [
    // { path: 'gis', component: GismapComponent },
    { path: 'gis', loadComponent: () => import('./gismap/gismap.component').then(c => c.GismapComponent)},
    { path: '', redirectTo: 'gis',pathMatch: 'full'},
];
