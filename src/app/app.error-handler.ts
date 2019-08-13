import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import Swal from "sweetalert2";
import { LoginService } from "./security/login/shared/login.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin();
            break;
          case 403:
            Swal.fire("", `${message} || 'Não autorizado.'`, "error");
            break;
          case 404:
            Swal.fire(
              "",
              `${message} || 'Recurso não encontrado. Verifique o console para mais detalhes.'`,
              "error"
            );
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }
}
