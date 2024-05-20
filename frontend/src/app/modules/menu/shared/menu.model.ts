import { Produto } from "app/modules/produto/shared/produto.model";

import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class Menu extends BaseResourceModel {
    id?: any;
    nomeMenu?: string;
    descricaoMenu?: string;
    preco?: number;
    produto?: Produto;

    static fromJson(jsonData: any): Menu{ 
        return Object.assign(new Menu(), jsonData); 
    } 
}

