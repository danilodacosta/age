import { Data } from './data-horario.model';
import { DateFormatPipe } from './../../shared/DateFormatPipe.pipe';
import { Agendamento } from './../../empreendimento-detalhe/agendamento.model';
import { DataHorarioService } from './data-horario.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-data-horario',
  templateUrl: './data-horario.component.html',
  styleUrls: ['./data-horario.component.scss']
})
export class DataHorarioComponent implements OnInit {

  @Output() selecionarData = new EventEmitter();

  public datasConsulta = '';
  public dataSelecionada: string;
  public horarios: Data;
  public datasDisponiveis: Array<Data>;
  public horariosDisponiveis: Array<any>;
  public statusConsulta: number;
  consultandoHorarios = false;

  constructor(
    private dataHorarioService: DataHorarioService,
    private dateFomartPipe: DateFormatPipe
  ) {}

  ngOnInit() {}

  public consultaDataDisponiveis(dadosAgendamento: Agendamento): void {
    this.consultandoHorarios = true;
    this.datasDisponiveis = new Array<Data>();
    this.horarios = new Data();
    dadosAgendamento.DataFinal = this.dateFomartPipe.transform(
      this.calcularProximosDias()
    );
    this.dataHorarioService
      .dataHorariosDisponiveis(dadosAgendamento)
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

  onChangeData(dataEscolhida: HTMLInputElement) {
    this.dataSelecionada = (dataEscolhida as HTMLInputElement).value;
    this.horarios = this.datasDisponiveis.find(
      data => data.data === this.dataSelecionada
    );
  }

  onChangeHorarioSelecionado() {

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

    console.log(this.datasDisponiveis);
    console.log(this.datasConsulta.substring(0, this.datasConsulta.length - 1));
  }
}
