import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TempsComponent } from './temps.component';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('TempsComponent', () => {
  let component: TempsComponent;
  let fixture: ComponentFixture<TempsComponent>;

  const route: any = { data: of({
    temps: [{"id":"00_0010_1122_10_0100_000_2_0","name":"Temperature sensor 1","rawValue":-1.4},
    {"id":"00_0010_1122_10_0100_002_2_0","name":"Temperature sensor 2","rawValue":8.4},"22:10","21.02.2018"]
  }) };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{provide: ActivatedRoute, useValue: route}],
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

  it('should assign value when route is resolved', () => {
    expect(component.tempSolar).toEqual(-1.4);
  });
});
