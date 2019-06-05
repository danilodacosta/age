import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agendamento-detalhe',
  templateUrl: './agendamento-detalhe.component.html',
  styleUrls: ['./agendamento-detalhe.component.scss']
})
export class AgendamentoDetalheComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    Swal.fire('', `Agendamento Realizado com sucesso !`, 'success');
  }
}
