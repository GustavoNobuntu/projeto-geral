import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoClienteFormComponent } from './cartao-cliente-form.component';

describe('CartaoClienteFormComponent', () => {
  let component: CartaoClienteFormComponent;
  let fixture: ComponentFixture<CartaoClienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaoClienteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaoClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
