import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  datas = '20/05/2019,21/05/2019,22/05/2019,23/05/2019,24/05/2019,24/06/2019';

  dataSelecionada: string;

  constructor() { }

  ngOnInit() {
  }

  onSaveName(dataEscolhida: HTMLInputElement) {
    this.dataSelecionada = (dataEscolhida as HTMLInputElement).value;
    console.log(this.dataSelecionada);
  }
}
