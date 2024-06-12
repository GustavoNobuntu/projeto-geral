//TODO essa função precisa ser gerada pelo mapperIdea

async function defineModels(connection) {

  connection.tenant = require("./tenant.model.js")(connection);

  connection.user = require("./user.model.js")(connection);

  connection.role = require("./role.model.js")(connection);

  return connection;
}

module.exports = defineModels;