const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');

const tenantConnections = {};

/**
 * Obter a instância de conexão com o banco de dados. Sendo esse banco de dados do banco responsável por armazenar os tenants. Sendo chaamdo de banco 'default'.
 * @returns retornar uma instância de conexão com o banco de dados
 */
async function getDefaultTenantConnection() {
  dbConfig = {
    type: process.env.defaultSecutityConnectionDatabaseType,
    uri: process.env.DatabaseUri,
  }
  return getTenantConnection(env.process.defaultSecutiryConnectionCode, dbConfig);
}

/**
 * Obtem a instância de conexão com o banco de dados de acordo com o tenant
 * @param {*} tenantId
 * @param {*} dbConfig Configurações de conexão do banco de dados 
 * @returns 
 */
async function getTenantConnection(tenantId, dbConfig) {
  if (!tenantConnections[tenantId]) {

    console.log("O tipo de banco de dados usado será o: ", dbConfig.type);

    if (dbConfig.type === 'mongodb') {

      await connectToDatabaseWithMongoose(dbConfig.uri, tenantId, tenantConnections);

    } else if (dbConfig.type === 'postgres') {

      await connectToDatabaseWithSequelize(dbConfig.uri, tenantId, tenantConnections);
      
    } else if(dbConfig.type === 'firebird'){

      await connectToDatabaseWithFirebird(dbConfig.uri, tenantId, tenantConnections);

    } else {
      throw new Error('Tipo de banco de dados não suportado');
    }
  }
  return tenantConnections[tenantId];
};

async function connectToDatabaseWithMongoose(uri, tenantId, tenantConnections){
  try {
    const connection = await mongoose.createConnection(uri);
    tenantConnections[tenantId] = { type: 'mongodb', connection };
    console.log("Conexão com banco de dados mongodb feita");

    return connection;
  } catch (error) {
    console.log({error: "Erro durante a conexão com o banco de dados", description: error});
    throw new Error('Erro ao conectar com banco de dados');
  }
}

async function connectToDatabaseWithSequelize(uri, tenantId, tenantConnections){
  try {
    const sequelize = new Sequelize(uri, {
      dialect: 'postgres',
      logging: false,
    });

    await sequelize.authenticate();
    tenantConnections[tenantId] = { type: 'postgres', connection: sequelize };
    console.log("Conexão com banco de dados postgres feita");
  } catch (error) {
    console.log({error: "Erro durante a conexão com o banco de dados", description: error});
    throw new Error('Erro ao conectar com banco de dados');
  }
}

async function connectToDatabaseWithFirebird(uri, tenantId, tenantConnections){
  //TODO fazer conexão com o banco de dados Firebird
  //Armazenar no array de instâncias de conexão
}

const getTenantConnectionFunctions = {
  getDefaultTenantConnection,
  getTenantConnection
} 

module.exports = { getTenantConnectionFunctions };
