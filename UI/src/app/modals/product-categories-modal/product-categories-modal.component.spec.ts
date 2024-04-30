import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoriesModalComponent } from './product-categories-modal.component';

describe('ProductCategoriesModalComponent', () => {
  let component: ProductCategoriesModalComponent;
  let fixture: ComponentFixture<ProductCategoriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCategoriesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
