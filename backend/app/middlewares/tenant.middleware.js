const databaseFunctions = require("../config/database.js");
// Middleware para trocar de banco de dados de acordo com o tenant
const jwt = require("jsonwebtoken");

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
  const user_authorization_code = req.header('Authorization');
  const access_token = user_authorization_code.split(' ')[1]; // Obtém o token após "Bearer"
  const decoded = jwt.decode(access_token);

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID é obrigatório' });
  }

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
