import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotelFormComponent } from './motel-form.component';

describe('MotelFormComponent', () => {
  let component: MotelFormComponent;
  let fixture: ComponentFixture<MotelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
