import { EmpreendimentoService } from './../empreendimento/empreendimento.service';
import { Convenio } from './../convenio/convenio.model';
import { Empreendimento } from './../empreendimento/empreendimento.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Prestador } from '../prestador/prestador.model';
import { ActivatedRoute } from '@angular/router';
import { PrestadorService } from '../prestador/prestador.service';
import { PrestadorComponent } from '../prestador/prestador.component';

@Component({
  selector: 'app-empreendimento-detalhe',
  templateUrl: './empreendimento-detalhe.component.html',
  styleUrls: ['./empreendimento-detalhe.component.scss']
})
export class EmpreendimentoDetalheComponent implements OnInit {


  @ViewChild('prestador') public prestadores: PrestadorComponent;

  public empreendimento: Empreendimento;
  public especialidades: Array<any>;
  public especialidadeSelecionada: string;
  public convenio: Convenio;
  public convenioSelecionado: Convenio;
  public consultandoPrestador = false;
  public convenios: Array<Convenio>;


  datas = '20/05/2019,21/05/2019,22/05/2019,23/05/2019,24/05/2019,24/06/2019';

  dataSelecionada: string;

  constructor(
    private empreendimentoService: EmpreendimentoService ,
    private route: ActivatedRoute,
    private prestadorService: PrestadorService,
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

  /* private consultarPrestadores(convenio: Convenio): void {
    this.convenioSelecionado = convenio;
    this.consultandoPrestador = true;
    const empreendimentoId = this.route.snapshot.params['id'];
    this.prestadorService.prestadores(empreendimentoId, convenio.id)
    .subscribe(prestadores => {
      this.prestadores = prestadores;
      this.consultandoPrestador = false;
    });
}*/

public selecionarConvenio(convenio: Convenio): void {
  this.prestadores.consultarPrestadores(convenio);
}

public selecionarPrestador(prestador: Prestador): void {
  console.log('prestador selecionado : id -' + prestador.id);
}

onSaveName(dataEscolhida: HTMLInputElement) {
  this.dataSelecionada = (dataEscolhida as HTMLInputElement).value;
  console.log(this.dataSelecionada);
}

}
