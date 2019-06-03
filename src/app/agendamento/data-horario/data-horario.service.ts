import { Data } from "./data-horario.model";
import { Agendamento } from "./../../empreendimento-detalhe/agendamento.model";
import { ErrorHandler } from "./../../app.error-handler";
import { AGE_API } from "./../../app.api";
import { retry, catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DataHorarioService {
  constructor(private http: HttpClient) { }
  public dataHorariosDisponiveis(agendamento: Agendamento) {
    return (
      this.http
        .get<Data[]>(
          `${AGE_API}/HorarioDisponivel/Consultar?Json=${JSON.stringify(
            agendamento
          )}`
        )
        .pipe(
          map(resposta => {
            return JSON.parse(JSON.stringify(resposta));
          }),
          retry(3),
          catchError(ErrorHandler.handleError)
        )
    );
  }
}
