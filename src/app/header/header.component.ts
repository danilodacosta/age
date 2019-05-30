import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() menuAberto = new EventEmitter();

  public openMenu = false;

  constructor() { }

  ngOnInit() {
  }

  toogleMenu() {
    this.openMenu = this.openMenu ? false : true;
  //  this.menuAberto.emit(this.openMenu);
  }
}
