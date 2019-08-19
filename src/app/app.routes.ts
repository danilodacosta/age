import { AcessoComponent } from './security/acesso/acesso.component';
import { LoggedInGuard } from './security/loggedin.guard';
import { LoginComponent } from './security/login/login.component';
import { ReagendarComponent } from './meus-agendamentos/visualizar-agendamento/reagendar/reagendar.component';

import { DetalhesComponent } from './meus-agendamentos/visualizar-agendamento/detalhes/detalhes.component';
import { MeusAgendamentosComponent } from './meus-agendamentos/meus-agendamentos.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { EmpreendimentoComponent } from './empreendimento/empreendimento.component';
import { Routes, CanActivate } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VisualizarAgendamentoComponent } from './meus-agendamentos/visualizar-agendamento/visualizar-agendamento.component';


export const ROUTES: Routes = [
  { path: '' , component: HomeComponent, canActivate: [LoggedInGuard]},
  { path: 'acesso' , component: AcessoComponent},
  { path: 'login/:to', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'empreendimentos' , component: EmpreendimentoComponent },
  { path: 'empreendimentos/:id', component: AgendamentoComponent},
  { path: 'meus-agendamentos', component: MeusAgendamentosComponent},
  { path: 'meus-agendamentos/:id', component: VisualizarAgendamentoComponent ,
    children: [
      { path: '', redirectTo: 'detalhes' , pathMatch: 'full'},
      { path: 'detalhes', component: DetalhesComponent },
      { path: 'reagendar', component: ReagendarComponent }
    ]}
  ];
