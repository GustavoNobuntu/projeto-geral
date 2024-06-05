const mongoose = require('mongoose');

const connectionFunctions = require('../../models/index');
const connections = {};

async function getDefaultConnection(){
  if(!connections[process.env.DatabaseUri]){
    connections[process.env.DatabaseUri] = await mongoose.createConnection(process.env.DatabaseUri);
  }

  return connections[process.env.DatabaseUri];
}

async function connectDataBase(dbURI) {
  if (connections[dbURI]) {
    return connections[dbURI];
  }

  try {
    // const connection = await mongoose.createConnection(dbURI);
    const connection = await connectionFunctions.connectionFactory(dbURI);
  
    connections[dbURI] = connection;
    console.log("Conexão com o banco de dados realizada com sucesso!");
    return connection;

  } catch (error) {
    console.warn("Erro ao realizar a conexão com o banco de dados!", error);
    return null;
  }
  
};

const databaseFunctions = {
  connectDataBase,
  getDefaultConnection
};

module.exports = databaseFunctions;
