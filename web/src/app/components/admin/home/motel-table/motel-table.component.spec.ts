import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotelTableComponent } from './motel-table.component';

describe('MotelTableComponent', () => {
  let component: MotelTableComponent;
  let fixture: ComponentFixture<MotelTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotelTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
