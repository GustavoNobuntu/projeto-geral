import { Categoria } from "app/modules/categoria/shared/categoria.model";
import { Opcional } from "app/modules/opcional/shared/opcional.model";

import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class Produto extends BaseResourceModel {
    id?: any;
    nomeProduto?: string;
    codigo?: number;
    descricaoProduto?: string;
    precoProduto?: number;
    imagem?: string;
    categoria?: Categoria;
    opcional?: Opcional;

    static fromJson(jsonData: any): Produto{ 
        return Object.assign(new Produto(), jsonData); 
    } 
}

