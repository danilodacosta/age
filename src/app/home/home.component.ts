import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // datas = '2019/05/20,2019/05/21,2019/05/22,2019/05/23,2019/05/24,2019/05/25,2019/05/26';
  datas = '20/05/2019,21/05/2019,22/05/2019,23/05/2019,24/05/2019,24/06/2019';

  constructor() { }

  ngOnInit() {

    $(document).ready(function() {

     $('#calendar').data('calendar');

    });

  }


  dataChange() {
    console.log('aa');
  }



}
