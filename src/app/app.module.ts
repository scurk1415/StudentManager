import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StudentstableComponent } from './studentstable/studentstable.component';
import { SearchComponent } from './search/search.component';

import { ModalModule, BsDropdownModule, PaginationModule } from 'ngx-bootstrap';

import { DataService } from './data.service';
import { PopupComponent } from './popup/popup.component';
import { ViewPopupComponent } from './view-popup/view-popup.component';
import { DepartmentPipe } from './department.pipe';
import { FacultynamePipe } from './facultyname.pipe';
import { CourseNamesPipe } from './course-names.pipe';
import { DepartmentNamePipe } from './department-name.pipe';

import {SelectModule} from 'ng2-select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentstableComponent,
    SearchComponent,
    PopupComponent,
    ViewPopupComponent,
    DepartmentPipe,
    FacultynamePipe,
    CourseNamesPipe,
    DepartmentNamePipe
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    SelectModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent],
})
export class AppModule { }
