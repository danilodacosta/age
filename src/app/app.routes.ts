import { AgendamentoComponent } from './agendamento/agendamento.component';
import { EmpreendimentoComponent } from './empreendimento/empreendimento.component';
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'empreendimentos' , component: EmpreendimentoComponent },
  { path: 'empreendimentos/:id', component: AgendamentoComponent}
];
