import { Categoria } from "app/modules/categoria/shared/categoria.model";
import { Produto } from "app/modules/produto/shared/produto.model";

import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Opcional extends BaseResourceModel {
    id?: any;
    nomeOpcional?: string;
    tipoOpcional?: string;
    maximaOpcionais?: number;
    produto?: Produto;
    categoria?: Categoria;

    static fromJson(jsonData: any): Opcional{
        return Object.assign(new Opcional(), jsonData);
    }
}

