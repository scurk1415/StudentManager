import { Faculty } from './../../models/Faculty';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Student } from '../../models/student';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupComponent} from '../popup/popup.component';
import { Subscription } from "rxjs/Subscription";
import { ModalDirective } from "ngx-bootstrap";
import { Course } from "../../models/Course";

@Component({
  selector: 'app-studentstable',
  templateUrl: './studentstable.component.html',
  styleUrls: ['./studentstable.component.css']
})
export class StudentstableComponent implements OnInit, OnDestroy {
  
  students: Student[] = [];
  faculties: Faculty[] = [];
  courses: Course[] = [];
  selectedStudent: Student;
  bigCurrentPage:number = 1;
  maxSize:number = 5;
  rows;
  itemsPerPage:number = 5;

  subscription: Subscription;

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
    this.students = this._dataSvc.getStudents();
    this.faculties = this._dataSvc.faculties;
    this.courses = this._dataSvc.courses;
    
    this.onPageChange({page: this.bigCurrentPage, itemsPerPage: this.itemsPerPage});

    this._dataSvc.studentsChanged.subscribe(
      (students: Student[])=> {
        this.onPageChange({page: this.bigCurrentPage, itemsPerPage: this.itemsPerPage});
      }
    );
  }

  onViewStudent(student: Student){
    this.selectedStudent = student;
  }

  onEditStudent(student: Student){
    this._dataSvc.startedEditing.next(student);
  }

  onDeleteStudent(student: Student){
    this._dataSvc.deleteStudent(student);
  }

  onPageChange(page:any) {
      let start = (page.page - 1) * page.itemsPerPage;
      let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : this.students.length;
      this.rows = this.students.slice(start, end);
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
