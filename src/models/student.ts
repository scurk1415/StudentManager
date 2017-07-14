import { Course } from './Course';

export class Student{

    constructor(
        public id : number,
        public name: string
    ){}

    //public id : number;
    //public name : string;
    public surname : string;
    public department : string;
    public faculty : string;
    public phone_number : string;
    public address : string;
    public courses : Course[];
}