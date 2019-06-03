import { AgendamentoService } from "./../agendamento/agendamento.service";
import { DateFormatStringPipe } from "./../shared/DataFormatPipeString.pipe";
import { DateFormatPipe } from "./../shared/DateFormatPipe.pipe";
import {
  DadosConsultaAgendamento,
  Agendamento
} from "./../agendamento/agendamento.model";
import { DataHorarioComponent } from "./../agendamento/data-horario/data-horario.component";
import { EmpreendimentoService } from "./../empreendimento/empreendimento.service";
import { Convenio } from "./../convenio/convenio.model";
import { Empreendimento } from "./../empreendimento/empreendimento.model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Prestador } from "../prestador/prestador.model";
import { ActivatedRoute, Router } from "@angular/router";
import { PrestadorComponent } from "../prestador/prestador.component";

import Swal from "sweetalert2";
declare var Metro: any;

@Component({
  selector: "app-empreendimento-detalhe",
  templateUrl: "./empreendimento-detalhe.component.html",
  styleUrls: ["./empreendimento-detalhe.component.scss"]
})
export class EmpreendimentoDetalheComponent implements OnInit {
  @ViewChild("prestador") public prestadores: PrestadorComponent;
  @ViewChild("dataHorario") public dataHorario: DataHorarioComponent;

  public empreendimento: Empreendimento;
  public especialidades: Array<any>;
  public especialidadeSelecionada: string;
  public convenio: Convenio;
  public convenioSelecionado: Convenio;
  public consultandoPrestador = false;
  public convenios: Array<Convenio>;
  public prestadorSelecionado: Prestador;
  public dataHoraSelecionado: any;

  constructor(
    private empreendimentoService: EmpreendimentoService,
    private agendamentoService: AgendamentoService,
    private route: ActivatedRoute,
    private dateFomartPipe: DateFormatPipe,
    private dateFomartStringPipe: DateFormatStringPipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.consultarEspecialidades();
    this.consultarEmpreendimento();
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
    const dadosAgendamento: DadosConsultaAgendamento = this.dadosConsultaAgendamento();
    dadosAgendamento.Prestador = prestador.id.toString();
    this.dataHorario.consultaDataDisponiveis(dadosAgendamento);
    this.prestadorSelecionado = prestador;
  }

  public confirmarAgendamento(dataHora: any): void {
    this.dataHoraSelecionado = dataHora;
    Metro.dialog.open("#dialog");
  }

  public agendar(): void {
    console.log("agendar()");
    const agendamento: Agendamento = this.agendamento();

    this.agendamentoService.agendar(agendamento).subscribe(retorno => {
      if (retorno.Status === 200) {
        this.router.navigate(["/agendamento-detalhe"]);
        Swal.fire("", `Agendamento Realizado com sucesso !`, "success");
      }
    });
  }

  private dadosConsultaAgendamento(): DadosConsultaAgendamento {
    const dadosConsultaAgendamento: DadosConsultaAgendamento = new DadosConsultaAgendamento();

    dadosConsultaAgendamento.Empreendimento = this.route.snapshot.params.id;
    dadosConsultaAgendamento.Prestador = "";
    dadosConsultaAgendamento.DataInicial = this.dateFomartPipe.transform(
      new Date()
    );
    dadosConsultaAgendamento.DataFinal = undefined;
    dadosConsultaAgendamento.TipoAgenda = "1";
    dadosConsultaAgendamento.Periodo = " ";
    dadosConsultaAgendamento.QuantReg = "0";
    dadosConsultaAgendamento.Hora = " ";
    dadosConsultaAgendamento.HoraPeriodo = " ";

    return dadosConsultaAgendamento;
  }

  private agendamento(): Agendamento {
    const agendamento: Agendamento = new Agendamento();

    agendamento.Empreendimento = this.route.snapshot.params.id;
    agendamento.Prestador = this.prestadorSelecionado.id.toString();
    agendamento.Cliente = "42";
    agendamento.AgendaPadrao = "1";
    agendamento.TipoAgendamento = "1";
    agendamento.TipoAgenda = "0";
    agendamento.Convenio = this.convenioSelecionado.id.toString();
    agendamento.Data = this.dateFomartStringPipe.transform(
      this.dataHoraSelecionado.data
    );
    agendamento.HoraInicial = this.dataHoraSelecionado.hora;
    agendamento.Observacao = `Consulta Agendada para o dia ${
      agendamento.Data
    } as ${agendamento.HoraInicial}`;
    return agendamento;
  }
}
