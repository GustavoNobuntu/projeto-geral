import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class CadastroCliente extends BaseResourceModel {
    id?: any;
    nomeCliente?: string;
    sobrenomeCliente?: string;
    emailCliente?: string;
    emailclienteConfirma?: string;
    senhaCliente?: string;
    senhaclienteConfirma?: string;

    static fromJson(jsonData: any): CadastroCliente{ 
        return Object.assign(new CadastroCliente(), jsonData); 
    } 
}

