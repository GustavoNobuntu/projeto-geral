const databaseFunctions = require("../config/database.js");
const jwt = require("jsonwebtoken");

/**
 * Registra todas as requisições realizadas na API
 * @param {*} req Informações da requisição
 * @param {*} res Funções para resposta
 * @param {*} next Função para permitir continuidade do usuário no processo do middleware
 */
async function registerOperation(req, res, next) {

  try {
    const tenantId = req.header('X-Tenant-ID');
    const ipAddress = req.header('X-Client-IP');
    const geoLocation = req.header('X-GeoLocation');
    const userAuthorizationCode = req.header('Authorization');
    
    const accessToken = userAuthorizationCode.split(' ')[1]; // Obtém o token após "Bearer"
    const decoded = jwt.decode(accessToken);
    const databaseConnection = await databaseFunctions.getDefaultConnection();

    const user = await databaseConnection.user.findOne({ UID: decoded.oid }).exec();

    //Obter acesso ao banco de dados padrão
    const _operation = databaseConnection.operation({
      user: user._id,
      operationType: req.method + ' ' + req.path,
      tenant: tenantId,
      details: req.body,
      ipAddress: ipAddress,
      geoLocation: geoLocation ? geoLocation : null,
      createdAt: new Date(),
    });

    //Registrar a operação
    _operation.save(_operation)
      .then(() => next())
      .catch(err => {
        // console.error(err);
        res.status(500).send({ error: 'Erro ao registrar a operação: ' + err });
      });

  } catch (error) {
    res.status(500).send({ error: 'Erro ao registrar a operação' });
  }
}

const operationFunctions = {
  registerOperation
};

module.exports = operationFunctions;