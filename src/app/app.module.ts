import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphicsComponent } from './graphics.component';
import { Graphics2Component } from './graphics2.component';


@NgModule({
  declarations: [
    AppComponent,
    GraphicsComponent, 
    Graphics2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
