import { DateFormatPipe } from './../../shared/DateFormatPipe.pipe';
import { Agendamento } from './../../empreendimento-detalhe/agendamento.model';
import { DataHorarioService } from './data-horario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-horario',
  templateUrl: './data-horario.component.html',
  styleUrls: ['./data-horario.component.scss']
})
export class DataHorarioComponent implements OnInit {

  datas = '20/05/2019,21/05/2019,22/05/2019,23/05/2019,24/05/2019,24/06/2019';

  dataSelecionada: string;

  // public datasDisponiveis: Array<Horarios> = [];

  constructor(private dataHorarioService: DataHorarioService, private dateFomartPipe: DateFormatPipe) { }

  ngOnInit() {

  }



  public consultaDataDisponiveis(dadosAgendamento: Agendamento): void {
    dadosAgendamento.DataFinal = this.dateFomartPipe.transform(this.calcularProximosDias());
    this.dataHorarioService
      .dataHorariosDisponiveis(dadosAgendamento)
      .subscribe(horarios => {
        console.log('horarios : ' + horarios.results);
      });
  }

  //
  onChangeData(dataEscolhida: HTMLInputElement) {
    this.dataSelecionada = (dataEscolhida as HTMLInputElement).value;
    console.log(this.dataSelecionada);
  }

  private calcularProximosDias(): Date {
    const data = new Date();
    const novaData = new Date();
    novaData.setDate(data.getDate() + 30);
    return novaData;
  }

/*
  private montaDatasDisponiveis(): void {

    let novaData: Horarios;
    this.horariosDisponiveis.forEach(element => {
      const dataExistente = this.datasDisponiveis.find((data) => data.data === element.Data);
      if (dataExistente) {
        dataExistente.horarios.push(element.HoraInicio);
      } else {
        novaData = new Horarios;
        novaData.data = element.Data;
        novaData.horarios = [];
        novaData.horarios.push(element.HoraInicio);
        this.datasDisponiveis.push(novaData);
      }
    });

    console.log(this.datasDisponiveis);

  }
*/

}
