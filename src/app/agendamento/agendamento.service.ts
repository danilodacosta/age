import { Query } from './../querys';
import { ErrorHandler } from './../app.error-handler';
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
    (`${AGE_API}/AgendamentoConsulta/Adicionar?Json=${JSON.stringify(agendamento)}` , httpOptions)
      .pipe(
        map(resposta => {
          return JSON.parse(JSON.stringify(resposta));
        }),
        catchError(ErrorHandler.handleError)
      );
  }

  consultarAgendamento() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
      })
    };

    return this.http.get(`${AGE_API}/GenericQuery/Executar?Query=${Query.consultarAgendamentos()}`, httpOptions).pipe(
      map(resposta => JSON.parse(resposta.toString()).classe),
      catchError(ErrorHandler.handleError)
    );
  }

  agendamentoById(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
      })
    };
    return this.http.get<any>(`${AGE_API}/GenericQuery/Executar?Query=${Query.consultarAgendamentoPorId(id)}`, httpOptions).pipe(
      map(resposta => JSON.parse(resposta.toString()).classe),
      catchError(ErrorHandler.handleError)
    );
  }

}
