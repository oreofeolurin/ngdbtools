import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormDemoComponent } from './dynamic-form-demo.component';

describe('DynamicFormDemoComponent', () => {
  let component: DynamicFormDemoComponent;
  let fixture: ComponentFixture<DynamicFormDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
