import { Convenio } from './convenio.model';
import { ConvenioService } from './convenio.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.component.html',
  styleUrls: ['./convenio.component.scss']
})
export class ConvenioComponent implements OnInit {

  @Output() selecionarConvenio = new EventEmitter();

  constructor(private convenioService: ConvenioService) {}
  public convenioSelecionado: Convenio;
  public convenios: Array<Convenio>;

  ngOnInit() {
    this.convenioService.convenios().subscribe(convenios => {
      this.convenios = convenios;
      this.convenioSelecionado = this.convenios[0];
      this.selecionarConvenio.emit(this.convenioSelecionado);
    });
  }

  public emitAddEvent(convenio: Convenio): void {
    this.convenioSelecionado = convenio;
    this.selecionarConvenio.emit(convenio);
  }
}
