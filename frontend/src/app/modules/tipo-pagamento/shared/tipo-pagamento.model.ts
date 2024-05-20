import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class TipoPagamento extends BaseResourceModel {
    id?: any;
    tipoPagamento?: string;

    static fromJson(jsonData: any): TipoPagamento{ 
        return Object.assign(new TipoPagamento(), jsonData); 
    } 
}

