import { AgendamentoService } from './../agendamento/agendamento.service';
import { DateFormatStringPipe } from './../shared/DataFormatPipeString.pipe';
import { DateFormatPipe } from './../shared/DateFormatPipe.pipe';
import { DadosConsultaAgendamento, Agendamento } from './../agendamento/agendamento.model';
import { DataHorarioComponent } from './../agendamento/data-horario/data-horario.component';
import { EmpreendimentoService } from './../empreendimento/empreendimento.service';
import { Convenio } from '../agendamento/convenio/convenio.model';
import { Empreendimento } from './../empreendimento/empreendimento.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Prestador } from '../agendamento/prestador/prestador.model';
import { ActivatedRoute } from '@angular/router';
import { PrestadorComponent } from '../agendamento/prestador/prestador.component';

declare var Metro: any;

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  @ViewChild('prestador')   public prestadores: PrestadorComponent;
  @ViewChild('dataHorario') public dataHorario: DataHorarioComponent;

  public empreendimento: Empreendimento;
  public especialidades: Array<any>;
  public especialidadeSelecionada: string;
  public convenio: Convenio;
  public convenioSelecionado: Convenio;
  public consultandoPrestador = false;
  public convenios: Array<Convenio>;
  public prestadorSelecionado: Prestador;
  public dataHoraSelecionado: any;

  public agendado = false;

  constructor(
    private empreendimentoService: EmpreendimentoService,
    private agendamentoService: AgendamentoService,
    private route: ActivatedRoute,
    private dateFomartPipe: DateFormatPipe,
    private dateFomartStringPipe: DateFormatStringPipe
    ) {}

  ngOnInit() {
    this.consultarEspecialidades();
    this.consultarEmpreendimento();
    this.agendado = false;
  }

  private consultarEspecialidades(): void {
    this.empreendimentoService
      .especialidadeByEmpreendimento(this.route.snapshot.params.id)
      .subscribe(especialidades => {
        this.especialidades = especialidades;
        this.especialidadeSelecionada = this.especialidades[0];
      });
  }

  private consultarEmpreendimento(): void {
    this.empreendimentoService
      .empreendimentoById(this.route.snapshot.params.id)
      .subscribe(empreendimento => {
        this.empreendimento = empreendimento[0];
      });
  }

  public selecionarConvenio(convenio: Convenio): void {
    this.convenioSelecionado = convenio;
    this.prestadores.consultarPrestadores(convenio);
    this.dataHorario.limparHorarios();
  }

  public selecionarPrestador(prestador: Prestador): void {
    const dadosAgendamento: DadosConsultaAgendamento = this.montaDadosConsultaAgendamento();
    dadosAgendamento.Prestador = prestador.id.toString();
    this.dataHorario.consultaDataDisponiveis(dadosAgendamento);
    this.prestadorSelecionado = prestador;
    this.scroll('dtfooter');
  }

  scroll(id: any) {
    const element = window.document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public confirmarAgendamento(dataHora: any): void {
    this.dataHoraSelecionado = dataHora;
    this.dialogAgendamento();
  }

  private dialogAgendamento(): void {
    Metro.dialog.create({
      title: 'Confirmar Agendamento ?',
      clsDialog: 'primary',
      content: `Deseja confirmar o seu agendamento com o
      <strong>${this.prestadorSelecionado.tratamento} ${this.prestadorSelecionado.nome}</strong> ?
      <hr>
      <span class='mif-calendar'></span><span> : ${this.dataHoraSelecionado.data} </span><br>
      <span class="mif-alarm"></span><span> : ${this.dataHoraSelecionado.hora}hs</span>`,
      actions: [
        {
          caption: 'Agendar',
          cls: 'shadow-2 js-dialog-close primary',
          onclick: () => {
            this.agendar();
          }
        },
        {
          caption: 'Cancelar',
          cls: 'shadow-2 alert js-dialog-close'
        }
      ]
    });
  }

  private agendar(): void {
    const agendamento: Agendamento = this.montaDadosAgendamento();
    this.agendamentoService.agendar(agendamento).subscribe(retorno => {
      if (retorno.Status === 200) {
          this.agendado = true;
          return;
        }
     });
   }

  private montaDadosConsultaAgendamento(): DadosConsultaAgendamento {
    const dadosConsultaAgendamento: DadosConsultaAgendamento = new DadosConsultaAgendamento();
    dadosConsultaAgendamento.Empreendimento = this.route.snapshot.params.id;
    dadosConsultaAgendamento.Prestador = '';
    dadosConsultaAgendamento.DataInicial = this.dateFomartPipe.transform(new Date());
    dadosConsultaAgendamento.DataFinal = undefined;
    dadosConsultaAgendamento.TipoAgenda = '1';
    dadosConsultaAgendamento.Periodo = ' ';
    dadosConsultaAgendamento.QuantReg = '0';
    dadosConsultaAgendamento.Hora = ' ';
    dadosConsultaAgendamento.HoraPeriodo = ' ';
    return dadosConsultaAgendamento;
  }

  private montaDadosAgendamento(): Agendamento {
    const agendamento: Agendamento = new Agendamento();
    agendamento.Empreendimento = this.route.snapshot.params.id;
    agendamento.Prestador = this.prestadorSelecionado.id.toString();
    agendamento.Cliente = '42';
    agendamento.AgendaPadrao = '1';
    agendamento.TipoAgendamento = '1';
    agendamento.TipoAgenda = '0';
    agendamento.Convenio = this.convenioSelecionado.id.toString();
    agendamento.Data = this.dateFomartStringPipe.transform(this.dataHoraSelecionado.data);
    agendamento.HoraInicial = this.dataHoraSelecionado.hora;
    agendamento.Observacao = `Consulta Agendada para o dia ${agendamento.Data} as ${agendamento.HoraInicial}`;
    return agendamento;
  }

}
