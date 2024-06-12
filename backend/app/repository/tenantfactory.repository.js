const MongooseRepository = require('./mongoose.repository');
const SequelizeRepository = require('./sequelize.repository');

function getRepository(dbType, model){
  switch (dbType) {
    case 'mongodb':
      console.log("Model obtido do mongodb");
      return new MongooseRepository(model);
    case 'postgres':
      console.log("Model obtido do postgres");
      return new SequelizeRepository(model);
    // Adicione outros tipos de banco de dados conforme necessário
    default:
      throw new Error('Tipo de banco de dados não suportado com a classe');
  }
};

module.exports = getRepository;
