import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoConsumoFormComponent } from './cartao-consumo-form.component';

describe('CartaoConsumoFormComponent', () => {
  let component: CartaoConsumoFormComponent;
  let fixture: ComponentFixture<CartaoConsumoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaoConsumoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaoConsumoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
