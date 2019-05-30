import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'age-app';
  openMenu = true;

  toogleMenu(openMenu) {
    this.openMenu = openMenu;
  }
}
