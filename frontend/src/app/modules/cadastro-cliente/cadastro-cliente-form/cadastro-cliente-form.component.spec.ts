import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroClienteFormComponent } from './cadastro-cliente-form.component';

describe('CadastroClienteFormComponent', () => {
  let component: CadastroClienteFormComponent;
  let fixture: ComponentFixture<CadastroClienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroClienteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
