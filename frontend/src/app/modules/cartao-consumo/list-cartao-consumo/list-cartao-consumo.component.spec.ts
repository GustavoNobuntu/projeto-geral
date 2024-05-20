import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCartaoConsumoComponent } from './list-cartao-consumo.component';

describe('ListCartaoConsumoComponent', () => {
  let component: ListCartaoConsumoComponent;
  let fixture: ComponentFixture<ListCartaoConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCartaoConsumoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCartaoConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
