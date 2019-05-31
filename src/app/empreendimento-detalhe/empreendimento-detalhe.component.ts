import { DateFormatPipe } from './../shared/DateFormatPipe.pipe';
import { Agendamento } from './agendamento.model';
import { DataHorarioComponent } from './../agendamento/data-horario/data-horario.component';
import { EmpreendimentoService } from './../empreendimento/empreendimento.service';
import { Convenio } from './../convenio/convenio.model';
import { Empreendimento } from './../empreendimento/empreendimento.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Prestador } from '../prestador/prestador.model';
import { ActivatedRoute } from '@angular/router';
import { PrestadorComponent } from '../prestador/prestador.component';

@Component({
  selector: 'app-empreendimento-detalhe',
  templateUrl: './empreendimento-detalhe.component.html',
  styleUrls: ['./empreendimento-detalhe.component.scss']
})
export class EmpreendimentoDetalheComponent implements OnInit {


  @ViewChild('prestador') public prestadores: PrestadorComponent;
  @ViewChild('dataHorario') public dataHorario: DataHorarioComponent;

  public empreendimento: Empreendimento;
  public especialidades: Array<any>;
  public especialidadeSelecionada: string;
  public convenio: Convenio;
  public convenioSelecionado: Convenio;
  public consultandoPrestador = false;
  public convenios: Array<Convenio>;

  constructor(
    private empreendimentoService: EmpreendimentoService,
    private route: ActivatedRoute,
    private dateFomartPipe: DateFormatPipe,
  ) { }

  ngOnInit() {
    this.consultarEspecialidades();
    this.consultarEmpreendimento();
  }

  private consultarEspecialidades(): void {
    this.empreendimentoService
      .especialidadeByEmpreendimento(this.route.snapshot.params['id'])
      .subscribe(especialidades => {
        this.especialidades = especialidades;
        this.especialidadeSelecionada = this.especialidades[0];
      });
  }

  private consultarEmpreendimento(): void {
    this.empreendimentoService
      .empreendimentoById(this.route.snapshot.params['id'])
      .subscribe(empreendimento => {
        this.empreendimento = empreendimento[0];
      });
  }

  public selecionarConvenio(convenio: Convenio): void {
    this.prestadores.consultarPrestadores(convenio);
  }

  public selecionarPrestador(prestador: Prestador): void {
    const dadosAgendamento: Agendamento = this.dadosAgendamento();
    dadosAgendamento.Prestador = prestador.id.toString();
    this.dataHorario.consultaDataDisponiveis(dadosAgendamento);
  }

  private dadosAgendamento(): Agendamento {

    const dadosAgendamento: Agendamento = new Agendamento();

    dadosAgendamento.Empreendimento = this.route.snapshot.params['id'];
    dadosAgendamento.Prestador = '';
    dadosAgendamento.DataInicial = this.dateFomartPipe.transform(new Date());
    dadosAgendamento.DataFinal = undefined;
    dadosAgendamento.TipoAgenda = '1';
    dadosAgendamento.Periodo = ' ';
    dadosAgendamento.QuantReg = '0';
    dadosAgendamento.Hora = ' ';
    dadosAgendamento.HoraPeriodo = ' ';

    return dadosAgendamento;
  }

}
