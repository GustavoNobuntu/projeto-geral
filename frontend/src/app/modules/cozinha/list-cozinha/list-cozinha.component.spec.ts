import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCozinhaComponent } from './list-cozinha.component';

describe('ListCozinhaComponent', () => {
  let component: ListCozinhaComponent;
  let fixture: ComponentFixture<ListCozinhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCozinhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCozinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
