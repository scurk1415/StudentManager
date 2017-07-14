import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StudentstableComponent } from './studentstable/studentstable.component';
import { SearchComponent } from './search/search.component';

import { ModalModule } from 'ngx-bootstrap';


import { DataService } from './data.service';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentstableComponent,
    SearchComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent],
})
export class AppModule { }
