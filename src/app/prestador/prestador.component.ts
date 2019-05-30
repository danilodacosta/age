import { Convenio } from './../convenio/convenio.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PrestadorService } from './prestador.service';
import { Prestador } from './prestador.model';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.scss']
})
export class PrestadorComponent implements OnInit {
  @Output() selecionarPrestador = new EventEmitter();

  public prestadores: Array<Prestador>;
  consultandoPrestador = false;
  public prestadorSelecionado: any;

  constructor(
    private route: ActivatedRoute,
    private prestadorService: PrestadorService
  ) {}

  ngOnInit() {}

  public consultarPrestadores(convenio: Convenio): void {
    this.consultandoPrestador = true;
    const empreendimentoId = this.route.snapshot.params['id'];
    this.prestadorService
      .prestadores(empreendimentoId, convenio.id)
      .subscribe(prestadores => {
        this.prestadores = prestadores;
        this.consultandoPrestador = false;
      });
  }

  public emitAddEvent(prestador: Prestador): void {
    this.selecionarPrestador.emit(prestador);
    this.prestadorSelecionado = prestador;
  }
}
