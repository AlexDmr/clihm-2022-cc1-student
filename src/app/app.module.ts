import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlateauComponent } from './plateau/plateau.component';
import { IAComponent } from './ia/ia.component';

@NgModule({
  declarations: [
    AppComponent,
    PlateauComponent,
    IAComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
