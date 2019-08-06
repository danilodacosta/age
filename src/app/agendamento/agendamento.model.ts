class Agendamento {

  public Empreendimento: string;
  public Prestador: string;
  public Cliente: string;
  public AgendaPadrao: string;
  public TipoAgendamento: string;
  public TipoAgenda: string;
  public Convenio: string;
  public Data: string;
  public HoraInicial: string;
  public Observacao: string;

}

class DadosConsultaAgendamento {
  public id?: string;
  public Empreendimento: string;
  public Prestador: string;
  public idConvenio?: string;
  public DataInicial: string;
  public DataFinal: string;
  public DataAgendada?: string;
  public TipoAgenda: string;
  public Periodo: string;
  public QuantReg: string;
  public Hora: string;
  public HoraPeriodo: string;
  public HoraInicial?: string;

}


export {Agendamento, DadosConsultaAgendamento};
