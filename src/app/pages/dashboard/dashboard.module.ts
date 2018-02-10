import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { SolarComponent } from './solar/solar.component';
import { WaterComponent } from './water/water.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    SolarComponent,
    WaterComponent
  ],
})
export class DashboardModule { }
