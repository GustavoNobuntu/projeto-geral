import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class Cliente extends BaseResourceModel {
    id?: any;
    nome?: string;
    telefone?: number;

    static fromJson(jsonData: any): Cliente{ 
        return Object.assign(new Cliente(), jsonData); 
    } 
}

