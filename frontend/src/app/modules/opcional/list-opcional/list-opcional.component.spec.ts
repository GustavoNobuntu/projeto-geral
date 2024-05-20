import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOpcionalComponent } from './list-opcional.component';

describe('ListOpcionalComponent', () => {
  let component: ListOpcionalComponent;
  let fixture: ComponentFixture<ListOpcionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOpcionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOpcionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
