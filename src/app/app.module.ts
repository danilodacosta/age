import { DataHorarioService } from './agendamento/data-horario/data-horario.service';
import { DateFormatPipe } from './shared/DateFormatPipe.pipe';
import { ConvenioService } from './convenio/convenio.service';
import { PrestadorService } from './prestador/prestador.service';
import { EmpreendimentoService } from './empreendimento/empreendimento.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PrestadorComponent } from './prestador/prestador.component';
import { EmpreendimentoComponent } from './empreendimento/empreendimento.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { HttpClientModule } from '@angular/common/http';
import { EmpreendimentoDetalheComponent } from './empreendimento-detalhe/empreendimento-detalhe.component';
import { ConvenioComponent } from './convenio/convenio.component';
import { DataHorarioComponent } from './agendamento/data-horario/data-horario.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PrestadorComponent,
    EmpreendimentoComponent,
    AgendamentoComponent,
    EmpreendimentoDetalheComponent,
    ConvenioComponent,
    DateFormatPipe,
    DataHorarioComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
  ],
  providers: [EmpreendimentoService, PrestadorService, ConvenioService , DataHorarioService, DateFormatPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
