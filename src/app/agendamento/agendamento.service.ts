import { Query } from './../querys';
import { AGE_API } from './../app.api';
import { Agendamento } from './agendamento.model';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AgendamentoService {

  constructor(private http: HttpClient) {}

  public agendar(agendamento: Agendamento) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
      })
    };

    return this.http.post<Agendamento>
    // ?Json=${JSON.stringify(agendamento)}`
    (`${AGE_API}/Agendamento/Agendar?Json=${JSON.stringify(agendamento)}` , httpOptions)
      .pipe(
        map(resposta => {
          return JSON.parse(JSON.stringify(resposta));
        })
      );
  }

  consultarAgendamento(idCliente: number) {

    const cliente = {cliente: idCliente};

    const httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
      })
    };
    return this.http.get(`${AGE_API}/Agendamento/ClienteConsultaAgenda?Json=${JSON.stringify(cliente)}`, httpOptions).pipe(
      map((resposta: any) => {
        return JSON.parse(JSON.stringify(resposta.Classe.ClienteAgendamentos));
      })
    );
  }

  agendamentoById(id: number) {

    const agendamento = {idAgenda: id};

    const httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
      })
    };

   // return this.http.get<any>(`${AGE_API}/GenericQuery/Executar?Query=${Query.consultarAgendamentoPorId(id)}`, httpOptions).pipe(
    return this.http.get(`${AGE_API}/Agendamento/ClienteConsultaAgendaById?Json=${JSON.stringify(agendamento)}`, httpOptions).pipe(
      map((resposta: any) => {
        return JSON.parse(JSON.stringify(resposta.Classe.ClienteAgendamentos));
      })
    );
  }

  cancelar(agendamento: any) {

    const dadosCancelamento = {
      IdAgenda: agendamento.Id,
      Empreendimento: agendamento.IdEmpreendimento,
      Prestador: agendamento.IdPrestador,
      Cliente: agendamento.IdCliente
    };

    const json = JSON.stringify(dadosCancelamento);

    return this.http.post<any>(`${AGE_API}/Agendamento/Cancelar?Json=${json}`, null).pipe(
      map((resposta: any) => {
        return resposta;
      })
    );
  }

  public reagendar(dadosReagendamento: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
      })
    };

    return this.http.post<Agendamento>
    // ?Json=${JSON.stringify(agendamento)}`
    (`${AGE_API}/Agendamento/Reagendar?Json=${JSON.stringify(dadosReagendamento)}` , httpOptions)
      .pipe(
        map(resposta => {
          return JSON.parse(JSON.stringify(resposta));
        })
      );
  }



}
