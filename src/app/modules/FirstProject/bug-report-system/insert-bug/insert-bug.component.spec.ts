import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertBugComponent } from './insert-bug.component';

describe('UpdateBugComponent', () => {
  let component: InsertBugComponent;
  let fixture: ComponentFixture<InsertBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertBugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
