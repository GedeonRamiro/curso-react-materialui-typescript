import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";

interface TAutoComleteOption {
  id: number;
  label: string;
}

export const AutoCompletoCidade = () => {
  const [opcoes, setOpcoes] = useState<TAutoComleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { debounce } = useDebounce();

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1 /* busca */).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          return alert(result.message);
        }

        setOpcoes(
          result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome }))
        );
      });
    });
  }, []);

  return (
    <Autocomplete
      options={opcoes}
      renderInput={(params) => <TextField {...params} label="Cidade" />}
    />
  );
};
