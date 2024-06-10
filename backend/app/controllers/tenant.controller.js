const getSchemaRefs = require("../../utils/populate.utils");
const connectionFunctions = require("../config/database");
const jwt = require("jsonwebtoken");

// Cria e salva um novo documento para a entidade Tenant
exports.create = async (req, res) => {
  try {

    const userAuthorizationCode = req.header('Authorization');
    const accessToken = userAuthorizationCode.split(' ')[1];
    const decoded = jwt.decode(accessToken);

    const connection = await connectionFunctions.getDefaultConnection();
    const user = connection.user.findOne({ UID: decoded.oid }).exec();

    const newTenant = connection.tenant({
      owner: user._id,
      dbURI: req.body.dbURI ? req.body.dbURI : null,
    });

    // const testConnection = await mongoose.createConnection(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const testConnection = await connectionFunctions.connectDataBase(req.body.dbURI);
    await testConnection.close();

    await newTenant.save();

    res.status(201).json({ message: 'Tenant criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tenant', error: error.message });
  }

  // // Save Tenant in the database
  // tenant
  //   .save(tenant)
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Ocorreu um erro de servidor ao tentar salvar Tenant."
  //     });
  //   });
};

// Procura por todas as entidades do tipo Tenant
exports.findAll = async (req, res) => {
  var condition = {};

  let populate = getSchemaRefs(await databaseFunctions.getDefaultConnection().tenant.schema.obj);
  let query = await databaseFunctions.getDefaultConnection().tenant.find();
  if (populate.length > 0) {
    query = query.populate(populate.join(" "));
  }
  query.then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocorreu um erro de servidor ao tentar buscar Tenant."
    });
  });
};

// Busca a entidade Tenant por id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  let populate = getSchemaRefs(await databaseFunctions.getDefaultConnection().tenant.schema.obj);

  // Se houver referências estrangeiras fazer o populate 
  let query = await databaseFunctions.getDefaultConnection().tenant.findOne({ _id: id });
  if (populate.length > 0) {
    query = query.populate(populate.join(" "));
  }

  query.then(data => {
    if (!data) {
      res.status(404).send({ message: "Não foi encontrado Tenant com o id " + id });
    } else {
      res.send(data);
    }
  }).catch(err => {
    res.status(500).send({ message: "Erro ao buscar Tenant com o id=" + id });
  });
};

// Altera uma entidade Tenant
exports.update = async (req, res) => {

  const id = req.params.id;

  await databaseFunctions.getDefaultConnection().tenant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `A entidade Tenant com id ${id} não encontrada, por isso não pode ser atualizada!`
        });
      } else res.send({ message: `A entidade Tenant com id ${id} foi alterada com sucesso.` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro desconhecido ocorreu ao alterar a entidade Tenant com o id " + id + "."
      });
    });
};

// Remove a entidade Tenant por id
exports.delete = async (req, res) => {

  const id = req.params.id;

  await databaseFunctions.getDefaultConnection().tenant.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `A entidade Tenant com id ${id} não encontrada, por isso não pode ser excluida!`
        });
      } else {
        res.send({
          message: `A entidade Tenant com id ${id} foi excluída com sucesso.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro desconhecido ocorreu ao excluir a entidade Tenant com o id " + id + "."
      });
    });
};

// Exclui todos os registros da entidade Tenant
exports.deleteAll = async (req, res) => {

  await databaseFunctions.getDefaultConnection().tenant.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Tenant'}  foram excluídas!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Tenant."
      });
    });
};

exports.findMultiple = async (req, res) => {
  let ids = req.body.tenants;

  await databaseFunctions.getDefaultConnection().tenant.find({
    '_id': { $in: ids }
  })
    .then(data => {
      let tenantDb = []
      data = data.map(tenant => {
        console.log(tenant.dbURI);
        tenantDb.push(tenant.dbURI);
      });
      res.send(tenantDb);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro de servidor ao tentar buscar Tenant."
      });
    });
}
