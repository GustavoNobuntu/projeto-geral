import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class ItemPedido extends BaseResourceModel {
    id?: any;
    nomePedido?: string;
    descricao?: string;
    quantidadePedido?: number;
    precoPedido?: number;
    numeroMesa?: number;

    static fromJson(jsonData: any): ItemPedido{ 
        return Object.assign(new ItemPedido(), jsonData); 
    } 
}

