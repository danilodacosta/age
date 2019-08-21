import { LoginService } from "./../security/login/shared/login.service";
import { AgendamentoService } from "./../agendamento/agendamento.service";
import { Component, OnInit } from "@angular/core";

import Swal from "sweetalert2";
declare var Metro: any;

@Component({
  selector: "app-meus-agendamentos",
  templateUrl: "./meus-agendamentos.component.html",
  styleUrls: ["./meus-agendamentos.component.scss"]
})
export class MeusAgendamentosComponent implements OnInit {
  agendamentos: any[];

  constructor(
    private agendamentoService: AgendamentoService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.consultarAgendamento();
  }

  consultarAgendamento() {
    this.agendamentoService
      .consultarAgendamento(+this.loginService.user.IdUsuario)
      .subscribe((response: any[]) => {
        console.log(response);
        this.agendamentos = response;
      });
  }

  dialogCancelar(agendamento: any): void {
    const hora = agendamento.HoraInicial.slice(0, 5);
    const data = this.convertDataPtBr(agendamento.DataAgendada);

    Metro.dialog.create({
      title: "Cancelar Agendamento ?",
      clsDialog: "alert",
      content: `Deseja cancelar o seu agendamento com o(a)
      <strong>${agendamento.Tratamento} ${agendamento.NomePrestador}</strong> ?
      <hr>
      <span class='mif-calendar'></span><span> : ${data} </span><br>
      <span class="mif-alarm"></span><span> : ${hora} hs</span>`,
      actions: [
        {
          caption: "Cancelar",
          cls: "shadow-2 js-dialog-close alert",
          onclick: () => {
            this.cancelar(agendamento);
          }
        },
        {
          caption: "Fechar",
          cls: "shadow-2  secondary js-dialog-close"
        }
      ]
    });
  }

  private cancelar(agendamento: any): void {
    this.agendamentoService.cancelar(agendamento).subscribe((retorno: any) => {
      Swal.fire("", `Agendamento Cancelado com sucesso !`, "success");
      this.consultarAgendamento();
    });
  }

  private convertDataPtBr(value: string): string {
    const ano = value.substring(6, 10);
    const mes = value.substring(3, 5);
    const dia = value.substring(0, 2);
    return `${dia}/${mes}/${ano}`;
  }

  public mesText(data: string): string {
    let mes = "";
    switch (data) {
      case "01": {
        mes = "Janeiro";
        break;
      }
      case "02": {
        mes = "Fevereiro";
        break;
      }
      case "03": {
        mes = "Março";
        break;
      }
      case "04": {
        mes = "Abril";
        break;
      }
      case "05": {
        mes = "Maio";
        break;
      }
      case "06": {
        mes = "Junho";
        break;
      }
      case "07": {
        mes = "Julho";
        break;
      }
      case "08": {
        mes = "Agosto";
        break;
      }
      case "09": {
        mes = "Setembro";
        break;
      }
      case "10": {
        mes = "Outubro";
        break;
      }
      case "11": {
        mes = "Novembro";
        break;
      }
      case "12": {
        mes = "Dezembro";
        break;
      }
      default: {
        break;
      }
    }
    return mes;
  }
}
