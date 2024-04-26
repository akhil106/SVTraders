import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-gismap',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './gismap.component.html',
  styleUrl: './gismap.component.scss'
})
export class GismapComponent {
  
}
