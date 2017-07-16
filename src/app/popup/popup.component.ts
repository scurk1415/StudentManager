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
  
  public items;
  private value;
  public active = [];

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
    this.faculties = this._dataSvc.faculties;
    this.departments = this._dataSvc.departments;
    this.courses = this._dataSvc.courses;

    this.subscription = this._dataSvc.startedEditing.subscribe((student: Student) => {
      this.isEditMode = student.is_edit;
      this.editedStudent = student;
      
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

      this.setCourses();
      this.active = [];
      this.courses.forEach(course => { 
        if(student.courses.indexOf(course.id) > -1){
          this.active.push({ id: course.id, text: course.name});
        }
      });

      console.log(this.active);
    });
  }

  onSubmit(form: NgForm){
    if(this.isEditMode){
      //could be moved to model
      this.editedStudent.student_number = form.value.student_number;
      this.editedStudent.name = form.value.name;
      this.editedStudent.surname = form.value.surname;
      this.editedStudent.phone_number = form.value.phone_number;
      this.editedStudent.address = form.value.address;
      this.editedStudent.department = form.value.department;
      this.editedStudent.faculty = form.value.faculty;
      this.editedStudent.courses = this.value.map(item => item.id);

      console.log(this.editedStudent.courses);
      this._dataSvc.editStudent(this.editedStudent);
    }
    else{
      const student = new Student(form.value.student_number, form.value.name,form.value.surname,form.value.phone_number,form.value.address, form.value.faculty, form.value.department, this.value.map(item => item.id));
      this._dataSvc.addStudent(student);
    }

    this.closePopup();
  }

  clearDepartment(){
    this.form.controls['department'].setValue("");
    this.form.controls['courses'].setValue([]);
    this.active = [];
  }

  refreshValue(value:any):void {
    this.value = value;
    let ints = this.value.map(val => val.id);
    this.form.controls['courses'].setValue([ints]);
  }

  changeCourses(){
    this.form.controls['courses'].setValue([]);
    this.active = [];
    if(this.form.value.department){
      this.setCourses();
    }
  }

  setCourses(){
    this.items = [];
    
    this.items = this._dataSvc.courses.map(course => {
      if(course.department_id == this.form.value.department){
        return {id: course.id, text: course.name};
      }
    });
  }

  closePopup(){
    this.form.reset();
    this.isEditMode = false;
    this.staticModal.hide();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
