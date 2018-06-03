import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TempsComponent } from './temps.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { Temps } from '../../temps.service';
import { DashboardComponent } from '../dashboard.component';
import { TempResolver } from '../../temp-resolver/temp-resolver.resolver';
import { ChartsModule } from 'ng2-charts';
import { of } from 'rxjs';

describe('TempsComponent', () => {
  let component: TempsComponent;
  let fixture: ComponentFixture<TempsComponent>;

  const route: any = { data: of({
    temps: [{"id": "00_0010_1122_10_0100_000_2_0", "time": "22:11", "date": "21.02.2018", "name": "Temperature sensor 1", "rawValue": -1.4},
    {"id": "00_0010_1122_10_0100_002_2_0", "time": "22:11", "date": "21.02.2018", "name": "Temperature sensor 2", "rawValue": 8.4}]
  }) };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [],
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
