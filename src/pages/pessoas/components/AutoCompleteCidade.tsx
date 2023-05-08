import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";

interface TAutoComleteOption {
  id: number;
  label: string;
}

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean;
}

export const AutoCompletoCidade = ({
  isExternalLoading = false,
}: IAutoCompleteCidadeProps) => {
  const [opcoes, setOpcoes] = useState<TAutoComleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const { debounce } = useDebounce();

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          return alert(result.message);
        }

        setOpcoes(
          result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome }))
        );
      });
    });
  }, [busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return undefined;

    const selectedOption = opcoes.find((opcao) => opcao.id === selectedId);

    return selectedOption;
  }, [selectedId, opcoes]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disablePortal
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      options={opcoes}
      loading={isLoading}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setBusca("");
      }}
      onInputChange={(_, newValue) => setBusca(newValue)}
      renderInput={(params) => <TextField {...params} label="Cidade" />}
    />
  );
};
