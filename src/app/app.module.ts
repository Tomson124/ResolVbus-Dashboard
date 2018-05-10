import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SolarComponent } from './pages/dashboard/solar/solar.component';
import { TempsService } from './temps.service';
import { RouterModule } from '@angular/router';
import { WaterComponent } from './pages/dashboard/water/water.component';
import { registerLocaleData } from '@angular/common';

import localeDE from '@angular/common/locales/de';

registerLocaleData(localeDE);


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    SolarComponent,
    WaterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [TempsService,
  {provide: LOCALE_ID, useValue: 'de'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
