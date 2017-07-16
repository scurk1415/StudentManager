import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  textChanged(text: string){
    this.filterChanged.emit(text);
  }
}
