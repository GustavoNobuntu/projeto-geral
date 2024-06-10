const db = require("../../models");
const User = db.db;
const findDataByCustomQuery = require("./customQuery.util");
const getSchemaRefs = require("../../utils/populate.utils");

validaCamposRequeridosUser = (req) => {
  const camposRequeridosEmpty = new Array();
  if (!req.body.UID) {
    camposRequeridosEmpty.push("UID");
  }
  if (!req.body.TenantUID) {
    camposRequeridosEmpty.push("TenantUID");
  }
  if (!req.body.username) {
    camposRequeridosEmpty.push("username");
  }
  if (!req.body.firstName) {
    camposRequeridosEmpty.push("firstName");
  }
  if (!req.body.lastName) {
    camposRequeridosEmpty.push("lastName");
  }
  if (!req.body.memberType) {
    camposRequeridosEmpty.push("memberType");
  }
  if (!req.body.Roles) {
    camposRequeridosEmpty.push("Roles");
  }
  return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade User
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.UID) {
    res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
    return;
  }

  // Validate required fields
  const camposRequeridosEmpty = validaCamposRequeridosUser(req);
  if (camposRequeridosEmpty.length > 0) {
    res.status(400).send({ message: "Campos requeridos (" + camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
    return;
  }

  // Create a User
  const user = req.databaseConnection.user({
    UID: req.body.UID ? req.body.UID : null,
    TenantUID: req.body.TenantUID ? req.body.TenantUID : null,
    username: req.body.username ? req.body.username : null,
    firstName: req.body.firstName ? req.body.firstName : null,
    lastName: req.body.lastName ? req.body.lastName : null,
    isAdministrator: false,
    memberType: req.body.memberType ? req.body.memberType : null,
    Roles: req.body.Roles ? req.body.Roles : null
  });

  const usersCreatedCount = await req.databaseConnection.user.countDocuments({});
  // console.log("Quantidade de usuários criados na aplicação: ",usersCreatedCount);

  if(usersCreatedCount == 0){
    user.isAdministrator = true;
  }

  const haveUserWithSameUIDRegisted = await req.databaseConnection.user.findOne({ UID: req.body.UID });

  if(haveUserWithSameUIDRegisted != null){
    res.status(400).send({
      message: "Ocorreu um erro de servidor ao tentar salvar User."
    });
    return;
  }

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro de servidor ao tentar salvar User."
      });
    });
};

// Procura por todas as entidades do tipo User
exports.findAll = (req, res) => {
  var condition = {};

  let populate = getSchemaRefs(req.databaseConnection.user.schema.obj);
  let query = req.databaseConnection.user.find();
  if (populate.length > 0) {
    query = query.populate(populate.join(" "));
  }
  query.then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocorreu um erro de servidor ao tentar buscar User."
    });
  });
};

// Busca a entidade User por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  let populate = getSchemaRefs(req.databaseConnection.user.schema.obj);

  // Se houver referências estrangeiras fazer o populate 
  let query = req.databaseConnection.user.findOne({ _id: id });
  if (populate.length > 0) {
    query = query.populate(populate.join(" "));
  }

  query.then(data => {
    if (!data) {
      res.status(404).send({ message: "Não foi encontrado User com o id " + id });
    } else {
      res.send(data);
    }
  }).catch(err => {
    res.status(500).send({ message: "Erro ao buscar User com o id=" + id });
  });
};

// Busca a entidade User por UID
exports.findOneByUID = (req, res) => {
  const UID = req.params.uid;

  let populate = getSchemaRefs(req.databaseConnection.user.schema.obj);

  // Se houver referências estrangeiras fazer o populate 
  let query = req.databaseConnection.user.findOne({ UID: UID });
  if (populate.length > 0) {
    query = query.populate(populate.join(" "));
  }

  query.then(data => {
    if (!data) {
      res.status(404).send({ message: "Não foi encontrado User com o uid " + UID });
    } else {
      res.status(200).send(data);
    }
  }).catch(err => {
    res.status(500).send({ message: "Erro ao buscar User com o uid=" + UID + err });
  });
};

// Altera uma entidade User
exports.update = (req, res) => {

  // Validate required fields
  const camposRequeridosEmpty = validaCamposRequeridosUser(req);
  if (camposRequeridosEmpty.length > 0) {
    res.status(400).send({ message: "Campos requeridos (" + camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
    return;
  }

  const id = req.params.id;

  req.databaseConnection.user.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `A entidade User com id ${id} não encontrada, por isso não pode ser atualizada!`
        });
      } else res.send({ message: `A entidade User com id ${id} foi alterada com sucesso.` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro desconhecido ocorreu ao alterar a entidade User com o id " + id + "."
      });
    });
};

// Remove a entidade User por id
exports.delete = (req, res) => {

  const id = req.params.id;

  req.databaseConnection.user.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `A entidade User com id ${id} não encontrada, por isso não pode ser excluida!`
        });
      } else {
        res.send({
          message: `A entidade User com id ${id} foi excluída com sucesso.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro desconhecido ocorreu ao excluir a entidade User com o id " + id + "."
      });
    });
};

// Exclui todos os registros da entidade User
exports.deleteAll = (req, res) => {

  req.databaseConnection.user.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'User'}  foram excluídas!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades User."
      });
    });
};

// Procura por entidade User onde o campo booleano isAdministrator seja true
exports.findAllIsAdministrator = (req, res) => {

  req.databaseConnection.user.find({ isAdministrator: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro desconhecido ocorreu ao buscar User por isAdministrator true."
      });
    });
};

exports.findCustom = async (req, res) => {
  const filterValues = req.body.filterValues;
  const filterConditions = req.body.filterValues;

  findDataByCustomQuery(filterValues, filterConditions, req.databaseConnection.user).then(data => {
    res.status(200).send(data);
  })
  .catch(error => {
    res.status(500).send({
      message:
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável"
    });
  });
};
