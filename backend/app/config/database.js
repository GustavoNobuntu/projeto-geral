const registerRoutes = require("../../utils/registerRoutes.util");
const connectionFunctions = require('../../models/index');
const connections = {};

async function getDefaultConnection(){
  if(!connections[process.env.DatabaseUri]){
    connections[process.env.DatabaseUri] = await connectionFunctions.connectionSecurityFactory(process.env.DatabaseUri);
  }

  return connections[process.env.DatabaseUri];
}

async function connectDataBase(dbURI) {
  if (connections[dbURI]) {
    return connections[dbURI];
  }

  try {

    var connection;
    
    if(dbURI == process.env.DatabaseUri){
      connection = await await connectionFunctions.connectionSecurityFactory(dbURI);
    } else {
      connection = await connectionFunctions.connectionFactory(dbURI);
      console.log("Conexão com outro tenant: ", connection);
    }
  
    connections[dbURI] = connection;
    console.log("Conexão com o banco de dados realizada com sucesso?!");

    if(dbURI != process.env.DatabaseUri){
      await registerRoutes.saveRoutes(connection);
      console.log("As rotas da API foram registradas no banco de dados");
    }

    return connection;

  } catch (error) {
    console.warn("Erro ao realizar a conexão com o banco de dados!", error);
    return new Error("Erro ao realizar a conexão com o banco de dados!");
  }
  
};

const databaseFunctions = {
  connectDataBase,
  getDefaultConnection
};

module.exports = databaseFunctions;
