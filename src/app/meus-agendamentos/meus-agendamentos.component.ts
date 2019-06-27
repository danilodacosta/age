import { AgendamentoService } from './../agendamento/agendamento.service';
import { Component, OnInit } from '@angular/core';

declare var Metro: any;

@Component({
  selector: 'app-meus-agendamentos',
  templateUrl: './meus-agendamentos.component.html',
  styleUrls: ['./meus-agendamentos.component.scss']
})
export class MeusAgendamentosComponent implements OnInit {

  agendamentos: any[];

  constructor(private agendamentoService: AgendamentoService) { }

  ngOnInit() {
    this.consultarAgendamento();
  }

  consultarAgendamento() {
    this.agendamentoService.consultarAgendamento().subscribe((response: any[]) => {
      this.agendamentos = response;
      console.log(this.agendamentos);
    });
  }

  cancelar(agendameto: any): void {

    const hora = agendameto.horaInicial.slice(0, 5);
    const data = this.convertDataPtBr(agendameto.dataAgendada.slice(0, 10));

    Metro.dialog.create({
      title: 'Cancelar Agendamento ?',
      clsDialog: 'alert',
      content: `Deseja cancelar o seu agendamento com o
      <strong>${agendameto.tratamento} ${agendameto.nome}</strong> ?
      <hr>
      <span class='mif-calendar'></span><span> : ${data} </span><br>
      <span class="mif-alarm"></span><span> : ${hora} hs</span>`,
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

  private convertDataPtBr(value: string): string {
   const ano = value.substring(0, 4);
   const mes = value.substring(5, 7);
   const dia = value.substring(8, 10);
   return `${dia}/${mes}/${ano}`;
  }

}
