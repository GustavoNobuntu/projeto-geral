const defineModelsMongoose = require('../../models/mongoose/index.model');
const defineModelsSequelize = require('../../models/sequelize/index.model');
const { getTenantConnectionFunctions } = require('../repository/tenantConnectionManager');
// const defineUserMongoose = require('../models/mongodb/user.model');
// const defineUserSequelize = require('../models/postgres/user.model');

async function tenantMiddleware(req, res, next){
  const tenantId = req.headers['X-Tenant-ID'];
  if (!tenantId) {
    return res.status(400).json({ message: 'Tenant ID não fornecido' });
  }

  if(isTenantRegistered() == true){

  }

  //No caso da pessoa não estar conectada, precisa desses dados.
  // var { dbConfig } = req.body.dbConfig; 

  // if(dbConfig){
  //   dbConfig = {
  //     type: dbConfig.type, // 'mongodb' ou 'postgres'
  //     uri: dbConfig.uri, // a URI do PostgreSQL ou MongoDB
  //   };
  // }

  // // Recuperar a configuração do banco de dados do tenant
  // if (tenantId === "mongodb") {
  //   console.log("Banco de dados: MongoDb");
  //   dbConfig = {
  //     type: 'mongodb', // ou 'postgres'
  //     uri: 'mongodb+srv://admin:admin@cluster0.a3mav.mongodb.net/curso-javascript?retryWrites=true&w=majority', // ou a URI do PostgreSQL
  //   };
  // } else {
  //   console.log("Banco de dados: Postgres");
  //   dbConfig = {
  //     type: 'postgres', // ou 'postgres'
  //     uri: 'postgres://postgres:admin@localhost:5432/mydb', // ou a URI do PostgreSQL
  //   };
  // }

  try {


    const { type, connection } = await getTenantConnectionFunctions.getTenantConnection(tenantId, dbConfig);

    if(connection == null){

    }

    if (type === 'mongodb') {
      req.databaseConnection = defineModelsMongoose(connection);
    } else if (type === 'postgres') {
      req.databaseConnection = defineModelsSequelize(connection);
    }
    req.dbType = tenantId;

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao configurar o banco de dados do tenant', error: error.message });
  }
};

async function getTenantConnection(req, tenantId, dbConfig){
  try {
    const { type, connection } = await getTenantConnectionFunctions.getTenantConnection(tenantId, dbConfig);

    if (type === 'mongodb') {
      return defineModelsMongoose(connection);
    } else if (type === 'postgres') {
      return defineModelsSequelize(connection);
    }

  } catch (error) {
    throw new Error('Erro ao conectar com o banco de dados e obter os models', error);
  }
}

async function isTenantRegistered(tenantId) {
  try {
    const connection = await getTenantConnectionFunctions.getDefaultTenantConnection();

  } catch (error) {
    throw new Error('Erro ao verificar se o tenant foi registrado no banco de dados', error);
  }
  //TODO obter a instância de conexão com o banco de dados Security

  //Realizar a requisição pra ver se o tenant foi registrado
  //Caso retornar o tenant, retorne sim
  //Caso não retornar o tenant, retorne não
}

const tenantFunctions = {
  changeTenant
};


module.exports = tenantMiddleware;
