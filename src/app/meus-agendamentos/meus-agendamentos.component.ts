import { Component, OnInit } from '@angular/core';

declare var Metro: any;

@Component({
  selector: 'app-meus-agendamentos',
  templateUrl: './meus-agendamentos.component.html',
  styleUrls: ['./meus-agendamentos.component.scss']
})
export class MeusAgendamentosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cancelar(): void {

    Metro.dialog.create({
      title: 'Cancelar Agendamento ?',
      clsDialog: 'alert',
      content: `Deseja cancelar o seu agendamento com o
      <strong>Dr. João Evandro</strong> ?
      <hr>
      <span class='mif-calendar'></span><span> : 27-05-08 </span><br>
      <span class="mif-alarm"></span><span> : 13:00hs</span>`,
      actions: [
        {
          caption: 'Cancelar',
          cls: 'shadow-2 js-dialog-close alert',
          onclick: () => {

          }
        },
        {
          caption: 'Fechar',
          cls: 'shadow-2  secondary js-dialog-close'
        }
      ]
    });

  }

}
