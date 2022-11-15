import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { debounce } = useDebounce();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      PessoaService.getAll(1, busca).then((result) => {
        if (result instanceof Error) {
          return alert(result.message);
        }
        console.log(result);
      });
    });
  }, [busca]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
        />
      }
      children
    ></LayoutBaseDePagina>
  );
};
