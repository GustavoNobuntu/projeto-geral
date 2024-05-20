export const environment = {
    applicationTitle: 'NadirDigital',

    backendUrl: "https://teste-pizzaria-api-oe4uwswcda-rj.a.run.app/",
    frontEndUrl: "https://teste-pizzaria-spa-oe4uwswcda-rj.a.run.app/",
        
    menuPath: "assets/dicionario/menu/menu.json",

    // Dados Relacionados ao Azure AD B2C
    authority: 'https://allystore.b2clogin.com/b46b5b87-a08e-487b-ae9b-fec172a9a90b/b2c_1_entradaEcadastro/v2.0/',//app-jef
    client_id:'aa90beb3-3aca-45aa-991a-e70d3ee59708', //app-jef-cloud
    redirect_uri: 'https://teste-pizzaria-spa-oe4uwswcda-rj.a.run.app/callback',//app-jef-cloud
    post_logout_redirect_uri: 'https://teste-pizzaria-spa-oe4uwswcda-rj.a.run.app/logout',//app-jef-cloud
    scope: 'https://allystore.onmicrosoft.com/aa90beb3-3aca-45aa-991a-e70d3ee59708/test.read openid',//app-jef-cloud

    tenant_id: 'b46b5b87-a08e-487b-ae9b-fec172a9a90b',
    provider: 'allystore.b2clogin.com',

    signInPolitical: 'b2c_1_entradaEcadastro',
    passwordResetPolitical: 'b2c_1_password_reset',
    profileEditPolitical: 'b2c_1_profile_edit',
    // --

    //Caminhos para o JSON de geração de telas

    cartaoConsumoJSONPath: '../../../../assets/dicionario/cartaoConsumo.json',

    clienteJSONPath: '../../../../assets/dicionario/cliente.json',

    cadastroClienteJSONPath: '../../../../assets/dicionario/cadastroCliente.json',

    cartaoClienteJSONPath: '../../../../assets/dicionario/cartaoCliente.json',

    categoriaJSONPath: '../../../../assets/dicionario/categoria.json',

    cozinhaJSONPath: '../../../../assets/dicionario/cozinha.json',

    enderecoJSONPath: '../../../../assets/dicionario/endereco.json',

    garconJSONPath: '../../../../assets/dicionario/garcon.json',

    itemPedidoJSONPath: '../../../../assets/dicionario/itemPedido.json',

    menuJSONPath: '../../../../assets/dicionario/menu.json',

    opcionalJSONPath: '../../../../assets/dicionario/opcional.json',

    pagamentoJSONPath: '../../../../assets/dicionario/pagamento.json',

    pedidoJSONPath: '../../../../assets/dicionario/pedido.json',

    produtoJSONPath: '../../../../assets/dicionario/produto.json',

    tipoPagamentoJSONPath: '../../../../assets/dicionario/tipoPagamento.json',
};
