import { Course } from './../../models/Course';
import { Department } from './../../models/Department';
import { Component, OnInit, Input } from '@angular/core';

import { Student } from "../../models/student";
import { Faculty } from "../../models/Faculty";
import { DataService } from "../data.service";

@Component({
  selector: 'app-view-popup',
  templateUrl: './view-popup.component.html',
  styleUrls: ['./view-popup.component.css']
})
export class ViewPopupComponent implements OnInit {

  @Input() staticModal;
  @Input() student: Student;
  
  faculties: Faculty[] = [];
  departments: Department[] = [];
  courses: Course[] = [];

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
    this.faculties = this._dataSvc.faculties;
    this.departments = this._dataSvc.departments;
    this.courses = this._dataSvc.courses;
  }

  closePopup(){
    this.staticModal.hide();
  }
}
