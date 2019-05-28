export class Query {
  public static consultarPrestadoresPorEmpreendimentoEConvenio(
    idEmpreendimento: number,
    idConvenio: number
  ): string {
    // tslint:disable-next-line:max-line-length
    const query = `SELECT distinct Prestadores.Id, Prestadores.Nome, Prestadores.Tratamento, TipoEspecialidades.Nome as TipoEspecialidade, Convenios.nome as Convenio , Prestadores.UriFoto FROM EmpreendimentosPrestadores
        INNER JOIN Prestadores ON EmpreendimentosPrestadores.IdPrestador = Prestadores.Id
        INNER JOIN PrestadoresEspecialidadesTipoEspecialidades ON PrestadoresEspecialidadesTipoEspecialidades.IdPrestador = Prestadores.Id
		    INNER JOIN TipoEspecialidades ON PrestadoresEspecialidadesTipoEspecialidades.IdTipoEspecilidade = TipoEspecialidades.Id
		    INNER JOIN EmpreendimentosConveniosAssociados ON Prestadores.Id = EmpreendimentosConveniosAssociados.idAssociado
		    INNER JOIN Convenios ON EmpreendimentosConveniosAssociados.idConvenio = Convenios.Id
        WHERE EmpreendimentosPrestadores.IdEmpreendimento = ${idEmpreendimento} and Convenios.id = ${idConvenio} order by Prestadores.id
        &Type=ExecuteReader`;
    return query;
  }

  public static consultarEspecialidadePorEmpreendimento(
    idEmpreendimento: number
  ): string {
    const query = `SELECT Especialidades.Id, Especialidades.nome FROM EmpreendimentosEspecialidades
      INNER JOIN Especialidades ON EmpreendimentosEspecialidades.IdEspecialidade = Especialidades.Id
      WHERE EmpreendimentosEspecialidades.IdEmpreendimento = ${idEmpreendimento}&Type=ExecuteReader`;
    return query;
  }

  public static consultarConvenioPorEmpreendimento(
    idEmpreendimento: number
  ): string {
    const query = `SELECT Especialidades.Id, Especialidades.nome FROM EmpreendimentosEspecialidades
      INNER JOIN Especialidades ON EmpreendimentosEspecialidades.IdEspecialidade = Especialidades.Id
      WHERE EmpreendimentosEspecialidades.IdEmpreendimento = ${idEmpreendimento}&Type=ExecuteReader`;
    return query;
  }

  public static consultarConvenios(): string {
    const query = `SELECT Id, nome, uriFoto FROM CONVENIOS&Type=ExecuteReader`;
    return query;
  }
}
