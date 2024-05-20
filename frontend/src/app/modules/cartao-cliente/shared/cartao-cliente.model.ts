import { TipoPagamento } from "app/modules/tipo-pagamento/shared/tipo-pagamento.model";

import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class CartaoCliente extends BaseResourceModel {
    id?: any;
    numeroCartao?: number;
    nomeImpresso?: string;
    anoValidade?: number;
    mesValidade?: number;
    diaValidade?: number;
    cvv?: number;
    pedidoCartao?: string;
    cpfcnpj?: number;
    tipoPagamento?: TipoPagamento;

    static fromJson(jsonData: any): CartaoCliente{ 
        return Object.assign(new CartaoCliente(), jsonData); 
    } 
}

