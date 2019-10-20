import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectSelectionComponent } from './defect-selection.component';

describe('DefectSelectionComponent', () => {
  let component: DefectSelectionComponent;
  let fixture: ComponentFixture<DefectSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
