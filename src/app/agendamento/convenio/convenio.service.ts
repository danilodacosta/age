import { Query } from '../../querys';
import { Convenio } from './convenio.model';
import { retry, catchError, map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandler } from '../../app.error-handler';
import { AGE_API } from '../../app.api';


@Injectable()
export class ConvenioService {
  constructor(private http: HttpClient) {}
  public convenios()  {
    return this.http.get<Convenio[]>(`${AGE_API}/GenericQuery/Executar?Query=${Query.consultarConvenios()}`)
    .pipe (
      map(resposta => JSON.parse(resposta.toString()).classe),
      retry(3),
      catchError(ErrorHandler.handleError)
    );
  }
}
