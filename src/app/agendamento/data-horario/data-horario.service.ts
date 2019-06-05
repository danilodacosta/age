import { Data } from "./data-horario.model";
import { DadosConsultaAgendamento } from "./../agendamento.model";
import { ErrorHandler } from "./../../app.error-handler";
import { AGE_API } from "./../../app.api";
import { retry, catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DataHorarioService {
  constructor(private http: HttpClient) { }
  public dataHorariosDisponiveis(dadosAgendamentoConsulta: DadosConsultaAgendamento) {
    console.log(`${AGE_API}/HorarioDisponivel/Consultar?Json=${JSON.stringify(
      dadosAgendamentoConsulta
    )}`)
    return (
      this.http
        .get<Data[]>(
          `${AGE_API}/HorarioDisponivel/Consultar?Json=${JSON.stringify(
            dadosAgendamentoConsulta
          )}`
        )
        .pipe(
          map(resposta => {
            console.log(resposta);
            return JSON.parse(JSON.stringify(resposta));
          }),
          retry(3),
          catchError(ErrorHandler.handleError)
        )
    );
  }
}
