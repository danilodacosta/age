import { Prestador } from './prestador.model';
import { Query } from './../querys';
import { retry, catchError, map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandler } from './../app.error-handler';
import { AGE_API } from '../app.api';


@Injectable()
export class PrestadorService {
  constructor(private http: HttpClient) {}
  public prestadores(idEmpreendimento: number , idConvenio: number)  {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Prestador[]>(`${AGE_API}/GenericQuery/Executar?Query=${Query.consultarPrestadoresPorEmpreendimentoEConvenio(idEmpreendimento, idConvenio)}`)
    .pipe (
      map(resposta => JSON.parse(resposta.toString()).classe),
      retry(3),
      catchError(ErrorHandler.handleError)
    );
  }

  public prestadorById(idPrestador: number)  {
    return this.http.get<Prestador>(`${AGE_API}/Prestadores/Consultar/${idPrestador}`)
    .pipe (
      map(resposta => JSON.parse(resposta.toString()).classe),
      retry(3),
      catchError(ErrorHandler.handleError)
    );
  }
}
