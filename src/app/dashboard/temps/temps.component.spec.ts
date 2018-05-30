import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempsComponent } from './temps.component';

describe('TempsComponent', () => {
  let component: TempsComponent;
  let fixture: ComponentFixture<TempsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
