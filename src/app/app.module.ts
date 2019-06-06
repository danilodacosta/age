import { DateFormatStringPipe } from './shared/DataFormatPipeString.pipe';
import { AgendamentoService } from './agendamento/agendamento.service';
import { DateFormatPipe } from './shared/DateFormatPipe.pipe';
import { ConvenioService } from './agendamento/convenio/convenio.service';
import { PrestadorService } from './agendamento/prestador/prestador.service';
import { EmpreendimentoService } from './empreendimento/empreendimento.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    DataHorarioComponent,
    AgendamentoDetalheComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES,  {useHash: true, onSameUrlNavigation: 'reload'}),
    HttpClientModule,
  ],
  // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  providers: [EmpreendimentoService, PrestadorService, ConvenioService , DateFormatPipe, DateFormatStringPipe, AgendamentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
