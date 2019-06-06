import { EmpreendimentoService } from './empreendimento.service';
import { Empreendimento } from './empreendimento.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empreendimento',
  templateUrl: './empreendimento.component.html',
  styleUrls: ['./empreendimento.component.scss']
})
export class EmpreendimentoComponent implements OnInit {

  empreendimentos: Empreendimento[];

  constructor(private empreendimentoService: EmpreendimentoService) { }

  ngOnInit() {
    this.empreendimentoService.empreendimentos()
    .subscribe((empreendimentos =>  {
      this.empreendimentos = empreendimentos;
    }));
  }

}
