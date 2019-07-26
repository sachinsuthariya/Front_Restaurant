import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBarchComponent } from './add-barch.component';

describe('AddBarchComponent', () => {
  let component: AddBarchComponent;
  let fixture: ComponentFixture<AddBarchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBarchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBarchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
