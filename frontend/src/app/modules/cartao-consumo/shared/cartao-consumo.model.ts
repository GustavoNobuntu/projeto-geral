import { Cliente } from "app/modules/cliente/shared/cliente.model";

import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class CartaoConsumo extends BaseResourceModel {
    id?: any;
    numeroCartao?: number;
    clientes?: Cliente;

    static fromJson(jsonData: any): CartaoConsumo{ 
        return Object.assign(new CartaoConsumo(), jsonData); 
    } 
}

