const mongoose = require("mongoose");

async function connectionFactory(dbURI) {
  const connection = await mongoose.createConnection(dbURI);

  //Declara CartaoConsumo
  connection.cartaoConsumo = require("./cartaoConsumo.model.js")(connection);

  //Declara Cliente
  connection.clientes = require("./cliente.model.js")(connection);

  //Declara CadastroCliente
  connection.cadastroCliente = require("./cadastroCliente.model.js")(connection);

  //Declara CartaoCliente
  connection.cartaoCliente = require("./cartaoCliente.model.js")(connection);

  //Declara Categoria
  connection.categoria = require("./categoria.model.js")(connection);

  //Declara Cozinha
  connection.cozinha = require("./cozinha.model.js")(connection);

  //Declara Endereco
  connection.endereco = require("./endereco.model.js")(connection);

  //Declara Garcon
  connection.garcon = require("./garcon.model.js")(connection);

  //Declara ItemPedido
  connection.itemPedido = require("./itemPedido.model.js")(connection);

  //Declara Menu
  connection.menu = require("./menu.model.js")(connection);

  //Declara Opcional
  connection.opcional = require("./opcional.model.js")(connection);

  //Declara Pagamento
  connection.pagamento = require("./pagamento.model.js")(connection);

  //Declara Pedido
  connection.pedido = require("./pedido.model.js")(connection);

  //Declara Produto
  connection.produto = require("./produto.model.js")(connection);

  //Declara TipoPagamento
  connection.tipoPagamento = require("./tipoPagamento.model.js")(connection);

  //Declara Users
  connection.user = require("./user.model.js")(connection);

  //Declara Roles
  connection.role = require("./role.model.js")(connection);

  //Declara FunctionsSystem
  connection.functions_system = require("./functionsSystem.model.js")(connection);

  //Declara FunctionsSystemRoles
  connection.functions_system_roles = require("./functionsSystemRoles.model.js")(connection);

  connection.session = require("./session.model.js")(connection);

  connection.tenant = require("./tenant.model.js")(connection);

  connection.pageStructure = require("./pageStructure.model.js")(connection);

  return connection;
}

async function connectionSecurityFactory(dbURI) {
  const connection = await mongoose.createConnection(dbURI);

  connection.user = require("./user.model.js")(connection);

  connection.tenant = require("./tenant.model.js")(connection);

  connection.operation = require("./operation.model.js")(connection);

  connection.role = require("./role.model.js")(connection);

  return connection;
}

const connectionFunctions = {
  connectionFactory,
  connectionSecurityFactory
};

module.exports = connectionFunctions;
