import { ErrorHandler } from "./../app.error-handler";
import { AGE_API } from "./../app.api";
import { Agendamento } from "./agendamento.model";
import { retry, catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AgendamentoService {
  constructor(private http: HttpClient) {}
  public agendar(agendamento: Agendamento) {
    return this.http
    .get<Agendamento>(
      `${AGE_API}/AgendamentoConsulta/Adicionar?Json=${JSON.stringify(
        agendamento
      )}`
    )
      .pipe(
        map(resposta => {
          console.log("resposta do agendamento " + JSON.stringify(resposta));
          return JSON.parse(JSON.stringify(resposta));
        }),
        catchError(ErrorHandler.handleError)
      );
  }
}
