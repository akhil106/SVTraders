import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GismapComponent } from './gismap.component';

describe('GismapComponent', () => {
  let component: GismapComponent;
  let fixture: ComponentFixture<GismapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GismapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GismapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
