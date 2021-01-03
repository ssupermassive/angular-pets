import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorReportsComponent } from './error-reports.component';

describe('FeedbackComponent', () => {
  let component: ErrorReportsComponent;
  let fixture: ComponentFixture<ErrorReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
