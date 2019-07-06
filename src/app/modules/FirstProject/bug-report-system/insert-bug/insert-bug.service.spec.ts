import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InsertBugComponent } from './insert-bug.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

fdescribe('UpdateBugComponent', () => {
  let component: InsertBugComponent;
  let fixture: ComponentFixture<InsertBugComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsertBugComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form is valid by having the required fields', () => {
    fixture.detectChanges();
    const validForm = fixture.debugElement.query(By.css('.ng-valid'));
    expect(validForm).toBeDefined();
  });

  it('form is invalid if no data entered.', () => {
    fixture.detectChanges();
    const invalidForm = fixture.debugElement.query(By.css('.ng-invalid'));
    expect(invalidForm).toBeDefined();
  });
});
