import { Data } from './data-horario.model';
import { Agendamento } from './../../empreendimento-detalhe/agendamento.model';
import { ErrorHandler } from './../../app.error-handler';
import { AGE_API } from './../../app.api';
import { retry, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable()
export class DataHorarioService {

  constructor(private http: HttpClient) { }
  public dataHorariosDisponiveis(agendamento: Agendamento) {
    console.log(`${AGE_API}/HorarioDisponivel/Consultar?Json=${JSON.stringify(agendamento)}`);
    return this.http.get<Data[]>(`${AGE_API}/HorarioDisponivel/Consultar?Json=${JSON.stringify(agendamento)}`)
      .pipe(
          map(resposta => {

          }),
          //console.log('resposta' + JSON.stringify(resposta.Classe.HorariosDisponiveis).toString());
          //console.log(JSON.stringify(resposta.toString()).Classe);

         // JSON.parse(resposta.toString()).Classe;
          //console.log(resposta.Classe.HorariosDisponiveis);

        retry(3),
        catchError(ErrorHandler.handleError)
      );
  }
}
