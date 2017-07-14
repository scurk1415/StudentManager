import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Student } from '../../models/student';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupComponent} from '../popup/popup.component';

@Component({
  selector: 'app-studentstable',
  templateUrl: './studentstable.component.html',
  styleUrls: ['./studentstable.component.css']
})
export class StudentstableComponent implements OnInit {
  
  public students: Student[] = [];
  public selectedStudent: Student;

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
    this.students = this._dataSvc.getStudents();
    console.log(this.students);
  }

  onDeleteStudent(student: Student){
    this._dataSvc.deleteStudent(student);
  }

}
