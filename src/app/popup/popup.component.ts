import { DepartmentPipe } from './../department.pipe';
import { Department } from './../../models/Department';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

import { DataService } from './../data.service';
import { Student } from '../../models/student';
import { Faculty } from '../../models/Faculty';
import { Course } from "../../models/Course";
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from "angular-2-dropdown-multiselect";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {

  @ViewChild('form') form: NgForm;
  @Input() staticModal;
  facultyHidden: string;
  subscription: Subscription;
  isEditMode: boolean = false;
  editedStudent: Student;
  faculties: Faculty[]; 
  departments: Department[]; 
  courses: Course[]; 

  myOptions: IMultiSelectOption[];

  // Settings configuration
  mySettings: IMultiSelectSettings = {
      enableSearch: true,
      buttonClasses: 'btn btn-default',
      dynamicTitleMaxItems: 3
  };

  // Text configuration
  myTexts: IMultiSelectTexts = {
      checkAll: 'Select all',
      uncheckAll: 'Unselect all',
      checked: 'item selected',
      checkedPlural: 'items selected',
      searchPlaceholder: 'Find',
      defaultTitle: 'Select',
      allSelected: 'All selected',
  };

  optionsModel: number[];

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
    this.faculties = this._dataSvc.faculties;
    this.departments = this._dataSvc.departments;

    this.subscription = this._dataSvc.startedEditing.subscribe((student: Student) => {
      this.isEditMode = true;
      this.editedStudent = student;
      console.log(student);
      this.optionsModel = student.courses;
      this.form.setValue({
        student_number: student.student_number,
        name: student.name,
        surname : student.surname,
        phone_number : student.phone_number,
        address : student.address,
        faculty : student.faculty || "",
        department : student.department || "",
        courses : student.courses || []
      });
    });
  }

  onSubmit(form: NgForm){
    console.log(form);
    if(this.isEditMode){
      this.editedStudent.update(form);
      this._dataSvc.editStudent(this.editedStudent);
    }
    else{
      const student = new Student(form.value.student_number, form.value.name,form.value.surname,form.value.phone_number,form.value.address, form.value.faculty, form.value.department, form.value.courses);
      this._dataSvc.addStudent(student);
    }

    this.form.reset();
    this.isEditMode = false;
    this.closePopup();
  }

  clearDepartment(){
    this.form.controls['department'].setValue("");
    this.form.controls['courses'].setValue([]);
  }

  changeCourses(){
    this.form.controls['courses'].setValue([]);
    if(this.form.value.department){
      this.myOptions = this._dataSvc.courses.filter(course => course.department_id == this.form.value.department);
    }
  }

  closePopup(){
    this.staticModal.hide();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
