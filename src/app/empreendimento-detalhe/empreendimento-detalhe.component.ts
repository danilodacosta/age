import { EmpreendimentoService } from './../empreendimento/empreendimento.service';
import { Convenio } from './../convenio/convenio.model';
import { Empreendimento } from './../empreendimento/empreendimento.model';
import { Component, OnInit } from '@angular/core';
import { Prestador } from '../prestador/prestador.model';
import { ActivatedRoute } from '@angular/router';
import { PrestadorService } from '../prestador/prestador.service';

@Component({
  selector: 'app-empreendimento-detalhe',
  templateUrl: './empreendimento-detalhe.component.html',
  styleUrls: ['./empreendimento-detalhe.component.scss']
})
export class EmpreendimentoDetalheComponent implements OnInit {

  public empreendimento: Empreendimento;
  public especialidades: Array<any>;
  public prestadores: Array<Prestador>;
  public especialidadeSelecionada: string;
  public convenio: Convenio;
  public convenioSelecionado: Convenio;
  public consultandoPrestador = false;
  public convenios: Array<Convenio>;

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

  private consultarPrestadores(convenio: Convenio): void {
    this.convenioSelecionado = convenio;
    this.consultandoPrestador = true;
    const empreendimentoId = this.route.snapshot.params['id'];
    this.prestadorService.prestadores(empreendimentoId, convenio.id)
    .subscribe(prestadores => {
      this.prestadores = prestadores;
      this.consultandoPrestador = false;
    });
}

public selecionarConvenio(convenio: Convenio): void {
  //this.consultarPrestadores(convenio);
  console.log(convenio);
}

}
