const connectionFunctions = require("../config/database");
const jwt = require("jsonwebtoken");

// const Tenant = require('./models/Tenant');  // Modelo de Tenant

/**
 * Registra o tenant no banco de dados
 * @param {*} req 
 * @param {*} res 
 */
async function createTenant(req, res) {
  const { dbType, dbConfig } = req.body; // Assume dbConfig contém a URI para MongoDB ou a configuração do Sequelize

  let connectionSuccess = false;

  if (dbType === 'mongodb') {
    connectionSuccess = await testMongooseConnection(dbConfig.uri);
  } else if (dbType === 'postgres') {
    connectionSuccess = await testSequelizeConnection(dbConfig);
    if (connectionSuccess) {
      const sequelize = new Sequelize(dbConfig);
      const models = {
        User: require('./models/UserSequelize')(sequelize),
        // Adicione outros modelos aqui
      };
      connectionSuccess = await createTables(sequelize, models);
    }
  }

  if (connectionSuccess) {

    const userAuthorizationCode = req.header('Authorization');
    const accessToken = userAuthorizationCode.split(' ')[1];//TODO arrumar pois pode dar erro se não tiver acessToken
    const decoded = jwt.decode(accessToken);
    
    const connection = await connectionFunctions.getDefaultConnection();
    const user = connection.user.findOne({ UID: decoded.oid }).exec();

    const newTenant = connection.tenant({
      owner: user._id,
      dbURI: req.body.dbURI ? req.body.dbURI : null,
    });

    try {
      await newTenant.save();
      res.status(201).json({ message: 'Tenant criado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao salvar tenant', error: error.message });
    }
  } else {
    res.status(400).json({ message: 'Erro ao conectar ao banco de dados' });
  }
}

const mongoose = require('mongoose');

async function testMongooseConnection(uri) {
  try {
    const connection = await mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true }).asPromise();
    await connection.close();
    return true;
  } catch (error) {
    return false;
  }
}

const { Sequelize } = require('sequelize');

async function testSequelizeConnection(config) {
  const sequelize = new Sequelize(config);
  try {
    await sequelize.authenticate();
    await sequelize.close();
    return true;
  } catch (error) {
    return false;
  }
}

async function createTables(sequelize, models) {
  try {
    await sequelize.sync({ force: true });  // Use 'force: true' para recriar as tabelas a cada execução (útil para desenvolvimento)
    return true;
  } catch (error) {
    return false;
  }
}



module.exports = createTenant;

