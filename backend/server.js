const express = require("express");
const cors = require("cors");
const app = express();
app.set('trust proxy', 1 /* number of proxies between user and server */);

require('dotenv').config();
const moment = require('moment-timezone');

const tenantFunctions = require("./app/middlewares/tenant.middleware");
const databaseFunctions = require("./app/config/database");
const operationFunctions = require("./app/middlewares/operation.middleware");

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Realiza a conexão com o banco de dados padrão
try {
  databaseFunctions.connectDataBase(process.env.DatabaseUri)
} catch (error) {
  console.warn(error);
  return;
}

app.use(operationFunctions.registerOperation);
// Define para usar o middleware de mudança de tenant
// app.use([tenantFunctions.changeTenant, operationFunctions.registerOperation]);

// app.use();

// simple route
app.get("/", (req, res) => {
  // console.log(req.headers);
  res.status(200).json({ message: "Welcome to application." });
});

//Declara CartaoConsumo rotas
require("./routes/cartaoConsumo.routes")(app);

//Declara Cliente rotas
require("./routes/cliente.routes")(app);

//Declara CadastroCliente rotas
require("./routes/cadastroCliente.routes")(app);

//Declara CartaoCliente rotas
require("./routes/cartaoCliente.routes")(app);

//Declara Categoria rotas
require("./routes/categoria.routes")(app);

//Declara Cozinha rotas
require("./routes/cozinha.routes")(app);

//Declara Endereco rotas
require("./routes/endereco.routes")(app);

//Declara Garcon rotas
require("./routes/garcon.routes")(app);

//Declara ItemPedido rotas
require("./routes/itemPedido.routes")(app);

//Declara Menu rotas
require("./routes/menu.routes")(app);

//Declara Opcional rotas
require("./routes/opcional.routes")(app);

//Declara Pagamento rotas
require("./routes/pagamento.routes")(app);

//Declara Pedido rotas
require("./routes/pedido.routes")(app);

//Declara Produto rotas
require("./routes/produto.routes")(app);

//Declara TipoPagamento rotas
require("./routes/tipoPagamento.routes")(app);

require("./routes/user.routes")(app);

require("./routes/session.routes")(app);

require("./routes/pageStructure.routes")(app);

require("./routes/tenant.routes")(app);

// Obtém a hora atual e o fuso horário da máquina
const now = moment();
const timezone = moment.tz.guess();
const currentTime = now.tz(timezone).format('YYYY-MM-DD HH:mm:ss');
const currentTimeZone = now.tz(timezone).format('Z');

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Horário atual: ${currentTime}`);
  console.log(`Fuso horário: ${timezone} (UTC${currentTimeZone})`);
});