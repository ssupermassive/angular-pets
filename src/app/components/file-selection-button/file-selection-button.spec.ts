import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectionButtonComponent } from './file-selection-button';

describe('FileSelectionButtonComponent', () => {
  let component: FileSelectionButtonComponent;
  let fixture: ComponentFixture<FileSelectionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileSelectionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSelectionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
