import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class Categoria extends BaseResourceModel {
    id?: any;
    nomeCategoria?: string;
    usaopcoesTamanho?: string;
    usaopcoesBorda?: string;
    setor?: string;

    static fromJson(jsonData: any): Categoria{ 
        return Object.assign(new Categoria(), jsonData); 
    } 
}

