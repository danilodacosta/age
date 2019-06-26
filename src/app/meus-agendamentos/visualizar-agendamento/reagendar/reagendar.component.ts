import { Data } from '../../../agendamento/data-horario/data-horario.model';
import { DateFormatPipe } from '../../../shared/DateFormatPipe.pipe';
import { DadosConsultaAgendamento } from 'src/app/agendamento/agendamento.model';
import { DataHorarioService } from '../../../agendamento/data-horario/data-horario.service';

import { Component, OnInit } from '@angular/core';


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
  public datasDisponiveis: Array<Data>;
  public horariosDisponiveis: Array<any>;
  public statusConsulta: number;
  consultandoHorarios = false;


  constructor(

    private dateFomartPipe: DateFormatPipe, private dataHorarioService: DataHorarioService) { }

  ngOnInit() {
    this.consultaDataDisponiveis();
  }

  onChangeData(dataEscolhida: HTMLInputElement) {
    this.dataSelecionada = (dataEscolhida as HTMLInputElement).value;
    this.consultaHorarios();
  }

  onChangeHorarioSelecionado(horarioSelecionado: string) {
    const datahora: any = new Object();
    datahora.data = this.dataSelecionada;
    datahora.hora = horarioSelecionado;
  }

  private consultaHorarios(): void {
    this.horarios = this.datasDisponiveis.find(
      data => data.data === this.dataSelecionada
    );
  }

  public consultaDataDisponiveis(): void {
    this.consultandoHorarios = true;
    this.datasDisponiveis = new Array<Data>();
    this.horarios = new Data();
     // tslint:disable-next-line:align
     this.dataHorarioService
      .dataHorariosDisponiveis(this.getDadosConsultaReagendamento())
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
  private getDadosConsultaReagendamento(): DadosConsultaAgendamento {
    const dadosConsultaAgendamento: DadosConsultaAgendamento = new DadosConsultaAgendamento();
    dadosConsultaAgendamento.Empreendimento = '1';
    dadosConsultaAgendamento.Prestador = '3';
    dadosConsultaAgendamento.DataInicial = this.dateFomartPipe.transform(new Date());
    dadosConsultaAgendamento.DataFinal = this.dateFomartPipe.transform(
      this.calcularProximosDias()
    );
    dadosConsultaAgendamento.TipoAgenda = '1';
    dadosConsultaAgendamento.Periodo = ' ';
    dadosConsultaAgendamento.QuantReg = '0';
    dadosConsultaAgendamento.Hora = this.getHoraAtual();
    dadosConsultaAgendamento.HoraPeriodo = ' ';
    return dadosConsultaAgendamento;
  }
}