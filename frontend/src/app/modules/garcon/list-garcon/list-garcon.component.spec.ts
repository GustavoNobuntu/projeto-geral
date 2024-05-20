import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGarconComponent } from './list-garcon.component';

describe('ListGarconComponent', () => {
  let component: ListGarconComponent;
  let fixture: ComponentFixture<ListGarconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGarconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGarconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
