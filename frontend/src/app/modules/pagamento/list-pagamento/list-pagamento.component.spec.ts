import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPagamentoComponent } from './list-pagamento.component';

describe('ListPagamentoComponent', () => {
  let component: ListPagamentoComponent;
  let fixture: ComponentFixture<ListPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
