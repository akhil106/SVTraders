import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeModalComponent } from './product-type-modal.component';

describe('ProductTypeModalComponent', () => {
  let component: ProductTypeModalComponent;
  let fixture: ComponentFixture<ProductTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTypeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
