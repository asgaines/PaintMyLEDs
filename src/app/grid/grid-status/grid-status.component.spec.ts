import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridStatusComponent } from './grid-status.component';

describe('GridStatusComponent', () => {
  let component: GridStatusComponent;
  let fixture: ComponentFixture<GridStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
