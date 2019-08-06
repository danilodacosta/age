import { ActivatedRoute, Router } from '@angular/router';
import { AgendamentoService } from './../../../agendamento/agendamento.service';
import { Data } from '../../../agendamento/data-horario/data-horario.model';
import { DateFormatPipe } from '../../../shared/DateFormatPipe.pipe';
import { DadosConsultaAgendamento, Agendamento } from 'src/app/agendamento/agendamento.model';
import { DataHorarioService } from '../../../agendamento/data-horario/data-horario.service';

import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2';
declare var Metro: any;

@Component({
  selector: 'app-reagendar',
  templateUrl: './reagendar.component.html',
  styleUrls: ['./reagendar.component.scss'],
  providers: [DataHorarioService]
})
export class ReagendarComponent implements OnInit {

  public datasConsulta = '';
  public dataSelecionada: any;
  public horarios: Data;
  public datasDisponiveis: Array<Data> = [];
  public horariosDisponiveis: Array<any>;
  public statusConsulta: number;
  consultandoHorarios = false;

  public dadosConsultaAgendamento = new DadosConsultaAgendamento();

  constructor(

    private dateFomartPipe: DateFormatPipe,
    private dataHorarioService: DataHorarioService,
    private agendamentoService: AgendamentoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.consultaDadosAgendamento();
   }

  onChangeData(dataEscolhida: HTMLInputElement) {
    this.dataSelecionada = (dataEscolhida as HTMLInputElement).value;
    this.consultaHorarios();
  }

  onChangeHorarioSelecionado(horarioSelecionado: string) {
    const datahora: any = new Object();
    datahora.data = this.dataSelecionada;
    datahora.hora = horarioSelecionado;
    this.dialogReagendamento(datahora);
  }

  private consultaHorarios(): void {
    this.horarios = this.datasDisponiveis.find(
      data => data.data === this.dataSelecionada
    );
  }

  public consultaDataDisponiveis(dadosConsultaAgendamento: DadosConsultaAgendamento): void {
    this.consultandoHorarios = true;
    this.datasDisponiveis = new Array<Data>();
    this.horarios = new Data();
     // tslint:disable-next-line:align
     this.dataHorarioService
      .dataHorariosDisponiveis(dadosConsultaAgendamento)
      .subscribe(retorno => {
        this.statusConsulta = retorno.Status;
        this.consultandoHorarios = false;
        if (retorno.Status === 201) {
          return;
        }
        this.datasConsulta = '';
        this.horariosDisponiveis = retorno.Classe.HorariosDisponiveis;
        this.montaDatasDisponiveis();
      });
  }

  private getHoraAtual(): string {
    const hora = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    return hora.substring(0, 5).toString();
  }

  private calcularProximosDias(): Date {
    const data = new Date();
    const novaData = new Date();
    novaData.setDate(data.getDate() + 30);
    return novaData;
  }

  private montaDatasDisponiveis(): void {
    let novaData: Data;
    this.horariosDisponiveis.forEach(element => {
      const dataExistente = this.datasDisponiveis.find(
        data => data.data === element.Data
      );
      if (dataExistente) {
        dataExistente.horarios.push(element.HoraInicio);
      } else {
        novaData = new Data();
        novaData.data = element.Data;
        novaData.horarios = [];
        novaData.horarios.push(element.HoraInicio);
        this.datasDisponiveis.push(novaData);
        this.datasConsulta = this.datasConsulta + novaData.data + ',';
      }
    });

    this.datasConsulta.substring(0, this.datasConsulta.length - 1);
    this.dataSelecionada = this.datasDisponiveis[0].data;
    this.consultaHorarios();
  }

private consultaDadosAgendamento() {

  this.dadosConsultaAgendamento = new DadosConsultaAgendamento();

  this.route.parent.paramMap.pipe(
    switchMap(params => this.agendamentoService.agendamentoById(+params.get('id')))
  )
  .subscribe(
     (agendamento) => {
       console.log(agendamento)
       this.dadosConsultaAgendamento.id = agendamento[0].Id;
       this.dadosConsultaAgendamento.idConvenio = agendamento[0].IdConvenio;
       this.dadosConsultaAgendamento.Empreendimento = agendamento[0].IdEmpreendimento.toString();
       this.dadosConsultaAgendamento.Prestador = agendamento[0].IdPrestador.toString();
       this.dadosConsultaAgendamento.DataInicial = this.dateFomartPipe.transform(new Date());
       this.dadosConsultaAgendamento.DataFinal = this.dateFomartPipe.transform(
       this.calcularProximosDias()
      );
       this.dadosConsultaAgendamento.DataAgendada = agendamento[0].DataAgendada;
       this.dadosConsultaAgendamento.TipoAgenda = '1';
       this.dadosConsultaAgendamento.Periodo = ' ';
       this.dadosConsultaAgendamento.QuantReg = '0';
       this.dadosConsultaAgendamento.Hora = this.getHoraAtual();
       this.dadosConsultaAgendamento.HoraPeriodo = ' ';
       this.dadosConsultaAgendamento.HoraInicial = agendamento[0].HoraInicial;
       this.consultaDataDisponiveis(this.dadosConsultaAgendamento);

     },
     (error) => console.log('error ' + error)
  );
}


private dialogReagendamento(datahora: any): void {

  const data = this.convertDataPtBr(datahora.data);

  Metro.dialog.create({
    title: 'Confirmar Reagendamento ?',
    clsDialog: 'primary',
    content: `Deseja confirmar o seu reagendamento para a data e horario escolhido  ?
    <hr>
    <span class='mif-calendar'></span><span> : ${data} </span><br>
    <span class="mif-alarm"></span><span> : ${datahora.hora}</span>`,
    actions: [
      {
        caption: 'Reagendar',
        cls: 'shadow-2 js-dialog-close primary',
        onclick: () => {
          this.reagendar(datahora);
        }
      },
      {
        caption: 'Cancelar',
        cls: 'shadow-2 alert js-dialog-close'
      }
    ]
  });
}

private convertDataPtBr(value: string): string {
  const ano = value.substring(6, 10);
  const mes = value.substring(3, 5);
  const dia = value.substring(0, 2);
  return `${dia}/${mes}/${ano}`;
 }


private reagendar(datahoraReagendamento: any): any {
    const dadosReagendamento = {
    IdAgenda: this.dadosConsultaAgendamento.id,
    Empreendimento: this.dadosConsultaAgendamento.Empreendimento,
    Prestador: this.dadosConsultaAgendamento.Prestador,
    Cliente: '42',
    Convenio: this.dadosConsultaAgendamento.idConvenio,
    Data: datahoraReagendamento.data,
    Hora: datahoraReagendamento.hora,
    // tslint:disable-next-line: max-line-length
    Observacao: `Consulta Reagendada do Dia ${this.dadosConsultaAgendamento.DataAgendada} as ${this.dadosConsultaAgendamento.HoraInicial}hs para o Dia ${datahoraReagendamento.data} as ${datahoraReagendamento.hora}hs`
 };

 console.log(dadosReagendamento);

    this.agendamentoService.reagendar(dadosReagendamento).subscribe((retorno: any) => {
   //   console.log(retorno)
      Swal.fire('', `Seu Reagendamento foi realizado com sucesso!`, 'success');
      this.router.navigateByUrl('meus-agendamentos', {skipLocationChange: true});
  });
  }
}
