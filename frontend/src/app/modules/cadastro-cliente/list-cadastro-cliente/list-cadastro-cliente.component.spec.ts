import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCadastroClienteComponent } from './list-cadastro-cliente.component';

describe('ListCadastroClienteComponent', () => {
  let component: ListCadastroClienteComponent;
  let fixture: ComponentFixture<ListCadastroClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCadastroClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCadastroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
