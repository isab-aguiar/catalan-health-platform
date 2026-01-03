import { useState, useEffect } from "react";
import { Calendar, Clock, Users, AlertCircle } from "lucide-react";
import { getEscalaAtiva } from "../../services/escalasService";

export default function EscalaFirestore({
  titulo = "Profissionais Escalados",
  escalaKey,
}) {
  const [escala, setEscala] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipoEscala, setTipoEscala] = useState(null);

  useEffect(() => {
    loadEscala();
  }, [escalaKey]);

  const loadEscala = async () => {
    if (!escalaKey) {
      setError("Chave da escala não informada");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const result = await getEscalaAtiva(escalaKey);

    if (result.success) {
      setEscala(result.data);
      setTipoEscala(result.tipo);
    } else {
      setError(result.error || "Erro ao carregar escala");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-neutral-600 text-sm">Carregando escala...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <p className="text-red-700 text-sm font-semibold">
            Erro ao carregar escala
          </p>
          <p className="text-red-600 text-xs">{error}</p>
        </div>
      </div>
    );
  }

  if (!escala || !escala.exibirNoPublico) {
    return null;
  }

  const escalaSemanalHabilitada = escala.escalaSemanal?.habilitado === true;

  const temProfissionaisNormais =
    escala.profissionais && escala.profissionais.length > 0;
  const temProfissionaisSemanais =
    escalaSemanalHabilitada &&
    Object.values(escala.escalaSemanal?.dias || {}).some(
      (dia) => dia.ativo && dia.profissionais && dia.profissionais.length > 0
    );

  if (!temProfissionaisNormais && !temProfissionaisSemanais) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Users className="w-12 h-12 text-neutral-300" />
          <p className="text-neutral-600 text-sm">
            Nenhum profissional escalado no momento
          </p>
          <p className="text-neutral-500 text-xs">
            As escalas serão atualizadas em breve
          </p>
        </div>
      </div>
    );
  }

  const profissionaisPorTurno = {
    manha: [],
    tarde: [],
    saudeNaHora: [],
  };

  if (!escalaSemanalHabilitada && escala.profissionais) {
    escala.profissionais.forEach((prof) => {
      if (prof.turno === "manha" || prof.turno === "both") {
        profissionaisPorTurno.manha.push(prof);
      }
      if (prof.turno === "tarde" || prof.turno === "both") {
        profissionaisPorTurno.tarde.push(prof);
      }
      if (prof.turno === "saudeNaHora") {
        profissionaisPorTurno.saudeNaHora.push(prof);
      }
    });
  }

  const diasSemana = [
    { key: "segunda", label: "Segunda-feira" },
    { key: "terca", label: "Terça-feira" },
    { key: "quarta", label: "Quarta-feira" },
    { key: "quinta", label: "Quinta-feira" },
    { key: "sexta", label: "Sexta-feira" },
  ];

  const agruparProfissionaisPorDias = (escala) => {
    const diasKeys = ["segunda", "terca", "quarta", "quinta", "sexta"];
    const profissionaisUnicos = new Map();

    diasKeys.forEach((dia) => {
      const diaData = escala.escalaSemanal?.dias?.[dia];
      if (diaData?.ativo && diaData.profissionais) {
        diaData.profissionais.forEach((prof) => {
          const key = `${prof.id || prof.nome}_${prof.turno}`;
          if (!profissionaisUnicos.has(key)) {
            profissionaisUnicos.set(key, {
              ...prof,
              dias: new Set(),
            });
          }
          profissionaisUnicos.get(key).dias.add(dia);
        });
      }
    });

    const resultado = {
      todosOsDias: [],
      diasEspecificos: {},
    };

    profissionaisUnicos.forEach((prof) => {
      const isSaudeNaHora = prof.turno === "saudeNaHora";

      if (prof.dias.size === 5 && !isSaudeNaHora) {
        resultado.todosOsDias.push({
          ...prof,
          dias: undefined,
        });
      } else {
        prof.dias.forEach((dia) => {
          if (!resultado.diasEspecificos[dia]) {
            resultado.diasEspecificos[dia] = [];
          }
          resultado.diasEspecificos[dia].push({
            ...prof,
            dias: undefined,
          });
        });
      }
    });

    return resultado;
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg shadow-md p-4 sm:p-5">
      <h3 className="font-semibold text-neutral-800 mb-4 pb-3 border-b border-neutral-300 text-sm flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        {titulo}
      </h3>

      {tipoEscala === "mensal" && (
        <div className="mb-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-3">
          <p className="text-xs text-blue-800">
            <strong>Escala Mensal</strong> - Esta é a escala específica do mês
            atual
          </p>
        </div>
      )}

      {(escala.horarios?.manha?.ativo ||
        escala.horarios?.tarde?.ativo ||
        escala.horarios?.saudeNaHora?.ativo) && (
        <div className="mb-5 bg-gradient-to-r from-blue-50 to-teal-50 border-l-4 border-blue-600 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-neutral-800 text-sm">
              Horário de Funcionamento
            </h4>
          </div>

          {(() => {
            const diasAtivos = new Set();
            const diasKeys = ["segunda", "terca", "quarta", "quinta", "sexta"];

            if (escalaSemanalHabilitada && escala.escalaSemanal?.dias) {
              diasKeys.forEach((dia) => {
                const diaData = escala.escalaSemanal.dias[dia];
                if (diaData && diaData.ativo === true) {
                  if (
                    diaData.profissionais &&
                    Array.isArray(diaData.profissionais) &&
                    diaData.profissionais.length > 0
                  ) {
                    diasAtivos.add(dia);
                  }
                }
              });
            } else {
              if (escala.observacoes && Array.isArray(escala.observacoes)) {
                const observacoesTexto = escala.observacoes
                  .join(" ")
                  .toLowerCase();

                if (
                  observacoesTexto.includes("quarta") ||
                  observacoesTexto.includes("quartas")
                ) {
                  diasAtivos.add("quarta");
                }
                if (
                  observacoesTexto.includes("segunda") &&
                  !observacoesTexto.includes("não")
                ) {
                  diasAtivos.add("segunda");
                }
                if (
                  observacoesTexto.includes("terça") &&
                  !observacoesTexto.includes("não")
                ) {
                  diasAtivos.add("terca");
                }
                if (
                  observacoesTexto.includes("quinta") &&
                  !observacoesTexto.includes("não")
                ) {
                  diasAtivos.add("quinta");
                }
                if (
                  observacoesTexto.includes("sexta") &&
                  !observacoesTexto.includes("não")
                ) {
                  diasAtivos.add("sexta");
                }

                if (
                  observacoesTexto.includes("segunda a sexta") ||
                  observacoesTexto.includes("todos os dias")
                ) {
                  diasKeys.forEach((dia) => diasAtivos.add(dia));
                }
              }
            }

            if (diasAtivos.size === 0) {
              return null;
            }

            let diasInfo;
            if (diasAtivos.size === 5) {
              diasInfo = "Segunda a Sexta-feira";
            } else {
              const labels = {
                segunda: "Segunda-feira",
                terca: "Terça-feira",
                quarta: "Quarta-feira",
                quinta: "Quinta-feira",
                sexta: "Sexta-feira",
              };
              const diasOrdenados = Array.from(diasAtivos).sort((a, b) => {
                const ordem = {
                  segunda: 1,
                  terca: 2,
                  quarta: 3,
                  quinta: 4,
                  sexta: 5,
                };
                return ordem[a] - ordem[b];
              });
              diasInfo = diasOrdenados.map((d) => labels[d]).join(", ");
            }

            return (
              <div className="mb-3">
                <div className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-md mb-3">
                  {diasInfo}
                </div>
              </div>
            );
          })()}

          <div className="flex flex-wrap gap-3">
            {escala.horarios?.manha?.ativo && (
              <div className="bg-white border border-blue-200 rounded-lg px-4 py-2 flex-1 min-w-[140px]">
                <div className="text-xs text-blue-700 font-medium mb-1">
                  Manhã
                </div>
                <div className="text-base font-bold text-neutral-900">
                  {escala.horarios.manha.display}
                </div>
              </div>
            )}
            {escala.horarios?.tarde?.ativo && (
              <div className="bg-white border border-amber-200 rounded-lg px-4 py-2 flex-1 min-w-[140px]">
                <div className="text-xs text-amber-700 font-medium mb-1">
                  Tarde
                </div>
                <div className="text-base font-bold text-neutral-900">
                  {escala.horarios.tarde.display}
                </div>
              </div>
            )}
            {escala.horarios?.saudeNaHora?.ativo && (
              <div className="bg-white border border-green-200 rounded-lg px-4 py-2 flex-1 min-w-[140px]">
                <div className="text-xs text-green-700 font-medium mb-1">
                  Saúde na Hora
                </div>
                <div className="text-base font-bold text-neutral-900">
                  {escala.horarios.saudeNaHora.display}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {escalaSemanalHabilitada ? (
        (() => {
          const grupos = agruparProfissionaisPorDias(escala);
          const { todosOsDias, diasEspecificos } = grupos;

          return (
            <>
              {todosOsDias.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-neutral-800 mb-3 pb-2 border-b border-neutral-300 text-sm">
                    Segunda a Sexta
                  </h4>

                  <div className="hidden md:block">
                    <table className="w-full border-collapse border border-neutral-300">
                      <thead>
                        <tr className="bg-neutral-100">
                          <th className="border border-neutral-300 px-4 py-2 text-left font-semibold text-neutral-700 text-xs">
                            Profissional
                          </th>
                          <th className="border border-neutral-300 px-4 py-2 text-left font-semibold text-neutral-700 text-xs">
                            Cargo
                          </th>
                          <th className="border border-neutral-300 px-4 py-2 text-left font-semibold text-neutral-700 text-xs">
                            Horário
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {todosOsDias.map((prof, idx) => (
                          <tr key={idx} className="bg-white">
                            <td className="border border-neutral-300 px-4 py-2">
                              <strong className="text-neutral-800 text-sm">
                                {prof.nome}
                              </strong>
                            </td>
                            <td className="border border-neutral-300 px-4 py-2 text-neutral-700 text-sm">
                              {prof.funcao}
                            </td>
                            <td className="border border-neutral-300 px-4 py-2 text-neutral-700">
                              <div className="space-y-1">
                                {escala.horarios?.manha?.ativo &&
                                  (prof.turno === "manha" ||
                                    prof.turno === "both") && (
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-3 h-3 text-blue-600" />
                                      <span className="text-xs">
                                        Manhã: {escala.horarios.manha.display}
                                      </span>
                                    </div>
                                  )}
                                {escala.horarios?.tarde?.ativo &&
                                  (prof.turno === "tarde" ||
                                    prof.turno === "both") && (
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-3 h-3 text-amber-600" />
                                      <span className="text-xs">
                                        Tarde: {escala.horarios.tarde.display}
                                      </span>
                                    </div>
                                  )}
                                {escala.horarios?.saudeNaHora?.ativo &&
                                  prof.turno === "saudeNaHora" && (
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-3 h-3 text-green-600" />
                                      <span className="text-xs">
                                        Saúde na Hora:{" "}
                                        {escala.horarios.saudeNaHora.display}
                                      </span>
                                    </div>
                                  )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="md:hidden space-y-2">
                    {todosOsDias.map((prof, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-neutral-200 rounded-lg p-3"
                      >
                        <div className="mb-2 pb-2 border-b border-neutral-200">
                          <div className="font-semibold text-neutral-800 text-sm mb-1">
                            {prof.nome}
                          </div>
                          <div className="text-xs text-neutral-600">
                            {prof.funcao}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 mb-1 font-medium">
                            Horários:
                          </p>
                          <div className="space-y-1">
                            {escala.horarios?.manha?.ativo &&
                              (prof.turno === "manha" ||
                                prof.turno === "both") && (
                                <div className="flex items-center gap-2 text-xs text-neutral-700">
                                  <Clock className="w-3 h-3 text-blue-600" />
                                  Manhã: {escala.horarios.manha.display}
                                </div>
                              )}
                            {escala.horarios?.tarde?.ativo &&
                              (prof.turno === "tarde" ||
                                prof.turno === "both") && (
                                <div className="flex items-center gap-2 text-xs text-neutral-700">
                                  <Clock className="w-3 h-3 text-amber-600" />
                                  Tarde: {escala.horarios.tarde.display}
                                </div>
                              )}
                            {escala.horarios?.saudeNaHora?.ativo &&
                              prof.turno === "saudeNaHora" && (
                                <div className="flex items-center gap-2 text-xs text-neutral-700">
                                  <Clock className="w-3 h-3 text-green-600" />
                                  Saúde na Hora:{" "}
                                  {escala.horarios.saudeNaHora.display}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {diasSemana.map(({ key, label }) => {
                const profissionaisDoDia = diasEspecificos[key] || [];

                if (profissionaisDoDia.length === 0) {
                  return null;
                }

                return (
                  <div key={key} className="mb-4 last:mb-0">
                    <h4 className="font-semibold text-neutral-800 mb-3 pb-2 border-b border-neutral-300 text-sm">
                      {label}
                    </h4>

                    <div className="hidden md:block">
                      <table className="w-full border-collapse border border-neutral-300">
                        <thead>
                          <tr className="bg-neutral-100">
                            <th className="border border-neutral-300 px-4 py-2 text-left font-semibold text-neutral-700 text-xs">
                              Profissional
                            </th>
                            <th className="border border-neutral-300 px-4 py-2 text-left font-semibold text-neutral-700 text-xs">
                              Cargo
                            </th>
                            <th className="border border-neutral-300 px-4 py-2 text-left font-semibold text-neutral-700 text-xs">
                              Horário
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {profissionaisDoDia.map((prof, idx) => (
                            <tr key={idx} className="bg-white">
                              <td className="border border-neutral-300 px-4 py-2">
                                <strong className="text-neutral-800 text-sm">
                                  {prof.nome}
                                </strong>
                              </td>
                              <td className="border border-neutral-300 px-4 py-2 text-neutral-700 text-sm">
                                {prof.funcao}
                              </td>
                              <td className="border border-neutral-300 px-4 py-2 text-neutral-700">
                                <div className="space-y-1">
                                  {escala.horarios?.manha?.ativo &&
                                    (prof.turno === "manha" ||
                                      prof.turno === "both") && (
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-blue-600" />
                                        <span className="text-xs">
                                          Manhã: {escala.horarios.manha.display}
                                        </span>
                                      </div>
                                    )}
                                  {escala.horarios?.tarde?.ativo &&
                                    (prof.turno === "tarde" ||
                                      prof.turno === "both") && (
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-amber-600" />
                                        <span className="text-xs">
                                          Tarde: {escala.horarios.tarde.display}
                                        </span>
                                      </div>
                                    )}
                                  {escala.horarios?.saudeNaHora?.ativo &&
                                    prof.turno === "saudeNaHora" && (
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-green-600" />
                                        <span className="text-xs">
                                          Saúde na Hora:{" "}
                                          {escala.horarios.saudeNaHora.display}
                                        </span>
                                      </div>
                                    )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="md:hidden space-y-2">
                      {profissionaisDoDia.map((prof, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-neutral-200 rounded-lg p-3"
                        >
                          <div className="mb-2 pb-2 border-b border-neutral-200">
                            <div className="font-semibold text-neutral-800 text-sm mb-1">
                              {prof.nome}
                            </div>
                            <div className="text-xs text-neutral-600">
                              {prof.funcao}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-neutral-500 mb-1 font-medium">
                              Horários:
                            </p>
                            <div className="space-y-1">
                              {escala.horarios?.manha?.ativo &&
                                (prof.turno === "manha" ||
                                  prof.turno === "both") && (
                                  <div className="flex items-center gap-2 text-xs text-neutral-700">
                                    <Clock className="w-3 h-3 text-blue-600" />
                                    Manhã: {escala.horarios.manha.display}
                                  </div>
                                )}
                              {escala.horarios?.tarde?.ativo &&
                                (prof.turno === "tarde" ||
                                  prof.turno === "both") && (
                                  <div className="flex items-center gap-2 text-xs text-neutral-700">
                                    <Clock className="w-3 h-3 text-amber-600" />
                                    Tarde: {escala.horarios.tarde.display}
                                  </div>
                                )}
                              {escala.horarios?.saudeNaHora?.ativo &&
                                prof.turno === "saudeNaHora" && (
                                  <div className="flex items-center gap-2 text-xs text-neutral-700">
                                    <Clock className="w-3 h-3 text-green-600" />
                                    Saúde na Hora:{" "}
                                    {escala.horarios.saudeNaHora.display}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          );
        })()
      ) : (
        <>
          <div className="hidden md:block">
            <table className="w-full border-collapse border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Profissional
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Cargo
                  </th>
                  <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-700 text-sm">
                    Horário
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {escala.profissionais.map((prof, idx) => (
                  <tr key={idx} className="bg-white">
                    <td className="border border-neutral-300 px-4 py-3">
                      <strong className="text-neutral-800">{prof.nome}</strong>
                    </td>
                    <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                      {prof.funcao}
                    </td>
                    <td className="border border-neutral-300 px-4 py-3 text-neutral-700">
                      <div className="space-y-1">
                        {escala.horarios?.manha?.ativo &&
                          (prof.turno === "manha" || prof.turno === "both") && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-blue-600" />
                              <span className="text-xs">
                                Manhã: {escala.horarios.manha.display}
                              </span>
                            </div>
                          )}
                        {escala.horarios?.tarde?.ativo &&
                          (prof.turno === "tarde" || prof.turno === "both") && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span className="text-xs">
                                Tarde: {escala.horarios.tarde.display}
                              </span>
                            </div>
                          )}
                        {escala.horarios?.saudeNaHora?.ativo &&
                          prof.turno === "saudeNaHora" && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-green-600" />
                              <span className="text-xs">
                                Saúde na Hora:{" "}
                                {escala.horarios.saudeNaHora.display}
                              </span>
                            </div>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3">
            {escala.profissionais.map((prof, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200 rounded-lg p-4"
              >
                <div className="mb-3 pb-3 border-b border-neutral-200">
                  <div className="font-semibold text-neutral-800 mb-1">
                    {prof.nome}
                  </div>
                  <div className="text-xs text-neutral-600">{prof.funcao}</div>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1 font-medium">
                    Horários:
                  </p>
                  <div className="space-y-1">
                    {escala.horarios?.manha?.ativo &&
                      (prof.turno === "manha" || prof.turno === "both") && (
                        <div className="flex items-center gap-2 text-xs text-neutral-700">
                          <Clock className="w-3 h-3 text-blue-600" />
                          Manhã: {escala.horarios.manha.display}
                        </div>
                      )}
                    {escala.horarios?.tarde?.ativo &&
                      (prof.turno === "tarde" || prof.turno === "both") && (
                        <div className="flex items-center gap-2 text-xs text-neutral-700">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Tarde: {escala.horarios.tarde.display}
                        </div>
                      )}
                    {escala.horarios?.saudeNaHora?.ativo &&
                      prof.turno === "saudeNaHora" && (
                        <div className="flex items-center gap-2 text-xs text-neutral-700">
                          <Clock className="w-3 h-3 text-green-600" />
                          Saúde na Hora: {escala.horarios.saudeNaHora.display}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-4 pt-4 border-t border-neutral-300">
        <p className="text-xs text-neutral-500 italic text-center">
          Escalas atualizadas automaticamente • Última atualização:{" "}
          {new Date().toLocaleDateString("pt-BR")}
        </p>
      </div>
    </div>
  );
}
