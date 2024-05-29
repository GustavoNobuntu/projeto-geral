export const environment = {
    applicationTitle: 'NadirDigital',

    backendUrl: "http://localhost:8080",
    frontendUrl: "https://localhost:4200",
    
    menuPath: "assets/dicionario/menu/menu.json",

    authority: 'https://allystore.b2clogin.com/b46b5b87-a08e-487b-ae9b-fec172a9a90b/b2c_1_entradaEcadastro/v2.0/',
    client_id:'46513151-51f8-4912-8051-8de83c3ef9ed', //app-jef '46513151-51f8-4912-8051-8de83c3ef9ed'
    redirect_uri: 'callback',//app-jef
    post_logout_redirect_uri: 'logout',//app-jef
    scope: 'https://allystore.onmicrosoft.com/46513151-51f8-4912-8051-8de83c3ef9ed/test.read openid',//app-jef
  
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
