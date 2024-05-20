import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCartaoClienteComponent } from './list-cartao-cliente.component';

describe('ListCartaoClienteComponent', () => {
  let component: ListCartaoClienteComponent;
  let fixture: ComponentFixture<ListCartaoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCartaoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCartaoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
