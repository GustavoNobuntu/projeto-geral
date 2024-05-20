import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionalFormComponent } from './opcional-form.component';

describe('OpcionalFormComponent', () => {
  let component: OpcionalFormComponent;
  let fixture: ComponentFixture<OpcionalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
