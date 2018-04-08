import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarComponent } from './solar.component';

describe('SolarComponent', () => {
  let component: SolarComponent;
  let fixture: ComponentFixture<SolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
