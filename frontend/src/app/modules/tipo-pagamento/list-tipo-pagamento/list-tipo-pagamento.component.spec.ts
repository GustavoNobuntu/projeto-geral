import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoPagamentoComponent } from './list-tipo-pagamento.component';

describe('ListTipoPagamentoComponent', () => {
  let component: ListTipoPagamentoComponent;
  let fixture: ComponentFixture<ListTipoPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTipoPagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTipoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
