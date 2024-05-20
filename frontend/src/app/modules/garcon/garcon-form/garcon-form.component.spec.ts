import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarconFormComponent } from './garcon-form.component';

describe('GarconFormComponent', () => {
  let component: GarconFormComponent;
  let fixture: ComponentFixture<GarconFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarconFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarconFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
