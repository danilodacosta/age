import { LoggedInGuard } from './security/loggedin.guard';
import { ApplicationErrorHandler } from './app.error-handler';
import { AuthInterceptor } from './security/auth.interceptor';
import { LoginService } from './security/login/shared/login.service';
import { MesFormatPipe } from './shared/MesFormatPipe.pipe';
import { DateFormatStringPipe } from './shared/DataFormatPipeString.pipe';
import { AgendamentoService } from './agendamento/agendamento.service';
import { DateFormatPipe } from './shared/DateFormatPipe.pipe';
import { ConvenioService } from './agendamento/convenio/convenio.service';
import { PrestadorService } from './agendamento/prestador/prestador.service';
import { EmpreendimentoService } from './empreendimento/empreendimento.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PrestadorComponent } from './agendamento/prestador/prestador.component';
import { EmpreendimentoComponent } from './empreendimento/empreendimento.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConvenioComponent } from './agendamento/convenio/convenio.component';
import { DataHorarioComponent } from './agendamento/data-horario/data-horario.component';
import { AgendamentoDetalheComponent } from './agendamento-detalhe/agendamento-detalhe.component';

import { CacheInterceptor } from './http-interceptors/cache-interceptor';
import { MeusAgendamentosComponent } from './meus-agendamentos/meus-agendamentos.component';
import { DetalhesComponent } from './meus-agendamentos/visualizar-agendamento/detalhes/detalhes.component';
import { ReagendarComponent } from './meus-agendamentos/visualizar-agendamento/reagendar/reagendar.component';
import { VisualizarAgendamentoComponent } from './meus-agendamentos/visualizar-agendamento/visualizar-agendamento.component';
import { LoginComponent } from './security/login/login.component';
import { FormFieldErrorComponent } from './shared/components/form-field-error/form-field-error.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PrestadorComponent,
    EmpreendimentoComponent,
    AgendamentoComponent,
    ConvenioComponent,
    DateFormatPipe,
    DateFormatStringPipe,
    MesFormatPipe,
    DataHorarioComponent,
    AgendamentoDetalheComponent,
    MeusAgendamentosComponent,
    DetalhesComponent,
    ReagendarComponent,
    VisualizarAgendamentoComponent,
    LoginComponent,
    FormFieldErrorComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
  ],
  // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  providers: [EmpreendimentoService,
              LoggedInGuard,
              PrestadorService,
              ConvenioService,
              AgendamentoService,
              LoginService,
              DateFormatPipe,
              DateFormatStringPipe, MesFormatPipe,
              {provide: HTTP_INTERCEPTORS,  useClass: AuthInterceptor, multi: true},
              {provide: ErrorHandler, useClass: ApplicationErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
