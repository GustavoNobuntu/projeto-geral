import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPagamentoFormComponent } from './tipo-pagamento-form.component';

describe('TipoPagamentoFormComponent', () => {
  let component: TipoPagamentoFormComponent;
  let fixture: ComponentFixture<TipoPagamentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPagamentoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoPagamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
