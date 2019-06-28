import { EmpreendimentoService } from './../../empreendimento/empreendimento.service';
import { Empreendimento } from './../../empreendimento/empreendimento.model';
import { Prestador } from './../../agendamento/prestador/prestador.model';
import { AgendamentoService } from './../../agendamento/agendamento.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PrestadorService } from 'src/app/agendamento/prestador/prestador.service';

@Component({
  selector: 'app-visualizar-agendamento',
  templateUrl: './visualizar-agendamento.component.html',
  styleUrls: ['./visualizar-agendamento.component.scss']
})
export class VisualizarAgendamentoComponent implements OnInit {

  public agendamento: any;
  public prestador: Prestador;
  public empreendimento: Empreendimento;

  constructor(private route: ActivatedRoute,
              private agendamentoService: AgendamentoService,
              private prestadorService: PrestadorService,
              private empreendimentoService: EmpreendimentoService) { }

  ngOnInit() {
    this.buscarAgendamento();
  }

  private buscarAgendamento() {
    const IdAgendamento = this.route.snapshot.params.id;
    this.agendamentoService.agendamentoById(IdAgendamento).subscribe(
      (response) => {
        this.agendamento = response[0];
        this.bucarPrestador();
      });
  }

  private bucarPrestador() {
    console.log(this.agendamento.idPrestador)
    this.prestadorService.prestadorAndEspecialidade(this.agendamento.idPrestador)
    .subscribe((response) => {
      this.prestador = response[0];
      this.buscarEmpreendimento();
    });
  }

  private buscarEmpreendimento() {
    console.log(this.agendamento.idPrestador)
    this.empreendimentoService.empreendimentoById(this.agendamento.idEmpreendimento)
    .subscribe((response) => {
      this.empreendimento = response[0];
    });
  }

}
