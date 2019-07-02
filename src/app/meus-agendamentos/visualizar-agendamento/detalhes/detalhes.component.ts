import { ActivatedRoute } from '@angular/router';
import { AgendamentoService } from './../../../agendamento/agendamento.service';
import { Component, OnInit } from '@angular/core';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  constructor(private agendamentoService: AgendamentoService,
              private route: ActivatedRoute) { }

  datelheAgendamento: any;
  dadosAgendamento: string;

  ngOnInit() {
    this.buscarAgendamento();
  }

  private buscarAgendamento() {

    this.route.parent.paramMap.pipe(
      switchMap(params => this.agendamentoService.agendamentoById(+params.get('id')))
    )
    .subscribe(
       (agendamento) => {
        this.datelheAgendamento = agendamento[0];
        this.dadosAgendamento = `
          ${this.datelheAgendamento.dataAgendada.slice(8, 10)} de
          ${this.mesText()} de
          ${this.datelheAgendamento.dataAgendada.slice(0, 4)} às
          ${this.datelheAgendamento.horaInicial.slice(0, 5)}hs`;
       },
       (error) => console.log('error ' + error)
    );
  }

  private mesText(): string {

    const data = this.datelheAgendamento.dataAgendada.slice(5, 7);

    let mes = '';
    switch (data) {
        case '01': {
          mes = 'Janeiro';
          break;
        }
        case '02': {
          mes = 'Fevereiro';
          break;
        }
        case '03': {
          mes = 'Março';
          break;
        }
        case '04': {
          mes = 'Abril';
          break;
        }
        case '05': {
          mes = 'Maio';
          break;
        }
        case '06': {
          mes = 'Junho';
          break;
        }
        case '07': {
          mes = 'Julho';
          break;
        }
        case '08': {
          mes = 'Agosto';
          break;
        }
        case '09': {
          mes = 'Setembro';
          break;
        }
        case '10': {
          mes = 'Outubro';
          break;
        }
        case '11': {
          mes = 'Novembro';
          break;
        }
        case '12': {
          mes = 'Dezembro';
          break;
        }
        default: {
          break;
        }
    }
    return mes;
  }
}
