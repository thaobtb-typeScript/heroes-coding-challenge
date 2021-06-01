import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { WeaponsComponent } from './pages/weapons/weapons.component';
import { ArmoursComponent } from './pages/armours/armours.component';

import { AppRoutingModule } from './app-routing.module';
import { CommonListComponent } from './components/common-list/common-list.component';
import { NoSanitizePipe } from './common/no-sanitize.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    WeaponsComponent,
    ArmoursComponent,
    CommonListComponent,
    NoSanitizePipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
