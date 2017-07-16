import { NgForm } from '@angular/forms';
import { Course } from './Course';

export class Student{
    constructor(
        public student_number : number,
        public name: string,
        public surname: string,
        public phone_number: string,
        public address: string,        
        public faculty: number,
        public department: number,
        public courses?: number[]
    )
    {
        this.id = Math.floor(Math.random() * 9000000) + 1000000;
    }

    public id: number;
    public is_edit: boolean;

    update(form: NgForm){
        this.student_number = form.value.student_number;
        this.name = form.value.name;
        this.surname = form.value.surname;
        this.phone_number = form.value.phone_number;
        this.address = form.value.address;
        this.department = form.value.department;
        this.faculty = form.value.faculty;
        this.courses = form.value.courses;
    }
    
    toThis(jsonStr: string) {
        let jsonObj: any = JSON.parse(jsonStr);
        for (let prop in jsonObj) {
            this[prop] = jsonObj[prop];
        }
    }
}