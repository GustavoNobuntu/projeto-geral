const databaseFunctions = require("../config/database.js");
const jwt = require("jsonwebtoken");

// Middleware para trocar de banco de dados de acordo com o tenant
async function userHasAccessToTenant(userUID, tenantId, databaseConnection) {
  try {
    const user = await databaseConnection.user.findOne({ UID: userUID }).populate("tenants").exec();
    
    const userHasTenant = user.tenants.some(_tenant => _tenant._id.toString() === tenantId);

    if(userHasTenant == true){
      return true;
    } else {
      return false;
    }

  } catch (error) {
    throw new Error(`Erro ao buscar o usuário e os tenants: ${error.message}`);
  }

}

async function changeTenant(req, res, next) {

  const tenantId = req.header('X-Tenant-ID');

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID é obrigatório' });
  }

  const userAuthorizationCode = req.header('Authorization');

  if (!userAuthorizationCode) {
    return res.status(400).json({ error: 'Authorization é obrigatório' });
  }

  const access_token = userAuthorizationCode.split(' ')[1]; // Obtém o token após "Bearer"
  const decoded = jwt.decode(access_token);

  try {

    if(await userHasAccessToTenant(decoded.oid, tenantId, await databaseFunctions.getDefaultConnection()) == false){
      return res.status(401).json({ error: 'Usuário sem permissão para operação' });
    }

    const connection = await databaseFunctions.connectDataBase(process.env.DatabaseUri);

    const tenantModel = connection.tenant;
    const tenant = await tenantModel.findById(tenantId);

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant não encontrado' });
    }

    const databaseConnection = await databaseFunctions.connectDataBase(tenant.dbURI);
    req.databaseConnection = databaseConnection;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const tenantFunctions = {
  changeTenant
};

module.exports = tenantFunctions;
