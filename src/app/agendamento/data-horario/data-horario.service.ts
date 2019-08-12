import { Data } from './data-horario.model';
import { DadosConsultaAgendamento } from './../agendamento.model';
import { AGE_API } from './../../app.api';
import { retry, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataHorarioService {

  constructor(private http: HttpClient) { }

  public dataHorariosDisponiveis(dadosAgendamentoConsulta: DadosConsultaAgendamento) {

console.log(`${AGE_API}/Agendamento/HorarioDisponivel?Json=${JSON.stringify(dadosAgendamentoConsulta)}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
      })
    };

return (this.http.post<Data[]>
  (`${AGE_API}/Agendamento/HorarioDisponivel?Json=${JSON.stringify(dadosAgendamentoConsulta)}`, httpOptions)
        .pipe(
          map(resposta => {
            return JSON.parse(JSON.stringify(resposta));
          }),
          retry(3)
        )
    );
  }
}
