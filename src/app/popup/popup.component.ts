import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from "@angular/forms";

import { Student } from '../../models/student';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() staticModal;
  @Input() student: Student; 

  constructor() { }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm){

  }

  closePopup(){
    this.staticModal.hide();
  }
}
