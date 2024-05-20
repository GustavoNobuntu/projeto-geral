const mongoose = require("mongoose"); 
mongoose.Promise = global.Promise; 
const db = {}; 
db.mongoose = mongoose; 

//Declara CartaoConsumo
db.cartaoConsumo = require("./cartaoConsumo.model.js")(mongoose); 

//Declara Cliente
db.clientes = require("./cliente.model.js")(mongoose); 

//Declara CadastroCliente
db.cadastroCliente = require("./cadastroCliente.model.js")(mongoose); 

//Declara CartaoCliente
db.cartaoCliente = require("./cartaoCliente.model.js")(mongoose); 

//Declara Categoria
db.categoria = require("./categoria.model.js")(mongoose); 

//Declara Cozinha
db.cozinha = require("./cozinha.model.js")(mongoose); 

//Declara Endereco
db.endereco = require("./endereco.model.js")(mongoose); 

//Declara Garcon
db.garcon = require("./garcon.model.js")(mongoose); 

//Declara ItemPedido
db.itemPedido = require("./itemPedido.model.js")(mongoose); 

//Declara Menu
db.menu = require("./menu.model.js")(mongoose); 

//Declara Opcional
db.opcional = require("./opcional.model.js")(mongoose); 

//Declara Pagamento
db.pagamento = require("./pagamento.model.js")(mongoose); 

//Declara Pedido
db.pedido = require("./pedido.model.js")(mongoose); 

//Declara Produto
db.produto = require("./produto.model.js")(mongoose); 

//Declara TipoPagamento
db.tipoPagamento = require("./tipoPagamento.model.js")(mongoose); 

//ADICIONADO

//Declara Users
db.user = require("./user.model.js")(mongoose); 

//Declara Roles
db.roles = require("./roles.model.js")(mongoose); 

//Declara FunctionsSystem
db.functions_system = require("./functionsSystem.model.js")(mongoose); 

//Declara FunctionsSystemRoles
db.functions_system_roles = require("./functionsSystemRoles.model.js")(mongoose); 

db.session = require("./session.model.js")(mongoose);

module.exports = db;
