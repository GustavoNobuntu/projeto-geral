import { ItemPedido } from "app/modules/item-pedido/shared/item-pedido.model";

import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class Cozinha extends BaseResourceModel {
    id?: any;
    nomePedido?: string;
    dataHora?: number;
    statusPedido?: string;
    itemPedido?: ItemPedido;

    static fromJson(jsonData: any): Cozinha{ 
        return Object.assign(new Cozinha(), jsonData); 
    } 
}

