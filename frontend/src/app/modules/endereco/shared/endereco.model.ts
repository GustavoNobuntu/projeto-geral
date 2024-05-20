import { CadastroCliente } from "app/modules/cadastro-cliente/shared/cadastro-cliente.model";

import { BaseResourceModel } from "app/shared/models/base-resource.model"; 

export class Endereco extends BaseResourceModel {
    id?: any;
    rua?: string;
    bairro?: string;
    cidade?: string;
    numeroMoradia?: number;
    cep?: number;
    complemento?: string;
    cadastroCliente?: CadastroCliente;

    static fromJson(jsonData: any): Endereco{ 
        return Object.assign(new Endereco(), jsonData); 
    } 
}

