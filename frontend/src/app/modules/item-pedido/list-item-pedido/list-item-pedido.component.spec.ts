import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemPedidoComponent } from './list-item-pedido.component';

describe('ListItemPedidoComponent', () => {
  let component: ListItemPedidoComponent;
  let fixture: ComponentFixture<ListItemPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
