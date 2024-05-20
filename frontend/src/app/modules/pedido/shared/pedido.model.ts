import { Pagamento } from "app/modules/pagamento/shared/pagamento.model";
import { Garcon } from "app/modules/garcon/shared/garcon.model";
import { ItemPedido } from "app/modules/item-pedido/shared/item-pedido.model";
import { CartaoConsumo } from "app/modules/cartao-consumo/shared/cartao-consumo.model";

import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class Pedido extends BaseResourceModel {
    id?: any;
    pedidoCancelado?: string;
    datahoraPedido?: number;
    pagamento?: Pagamento;
    garcon?: Garcon;
    itemPedido?: ItemPedido;
    cartaoConsumo?: CartaoConsumo;

    static fromJson(jsonData: any): Pedido{ 
        return Object.assign(new Pedido(), jsonData); 
    } 
}

