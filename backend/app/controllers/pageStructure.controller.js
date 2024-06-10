// const db = require("../../models");
const getSchemaRefs = require("../../utils/populate.utils");
// const pageStructure = db.pageStructure;
const findDataByCustomQuery = require("./customQuery.util");
const checkIfDateIsOlderFunctions = require("../middlewares/checkIfDateIsOlder.middleware");
const jwt = require("jsonwebtoken");

validaCamposRequeridospageStructure = (req) => {
  const camposRequeridosEmpty = new Array();
  if (!req.body.rolesHasAccess) {
    camposRequeridosEmpty.push("rolesHasAccess");
  }
  if (!req.body.className) {
    camposRequeridosEmpty.push("className");
  }
  if (!req.body.data) {
    camposRequeridosEmpty.push("data");
  }
  return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade pageStructure
exports.create = (req, res) => {

  // Validate required fields
  const camposRequeridosEmpty = validaCamposRequeridospageStructure(req);
  if (camposRequeridosEmpty.length > 0) {
    res.status(400).send({ message: "Campos requeridos (" + camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
    return;
  }

  // Create a pageStructure
  const pageStructure = req.databaseConnection.pageStructure({
    rolesHasAccess: req.body.rolesHasAccess ? req.body.rolesHasAccess : null,
    className: req.body.className ? req.body.className : null,
    data: req.body.data ? req.body.data : null
  })

  // Save pageStructure in the database
  pageStructure
    .save(pageStructure)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(error => {
      if (error.code === 11000) { // Código de erro para violação de índice único
        res.status(409).json({ message: 'Já existe um PageStructure com essa combinação de className e rolesHasAccess' });
      } else if(error.code === 409){
        res.status(409).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro ao criar PageStructure', error: error.message });
      }
    });
};

// Procura por todas as entidades do tipo pageStructure
exports.findAll = (req, res) => {

  let populate = getSchemaRefs(req.databaseConnection.pageStructure.schema.obj);
  let query = req.databaseConnection.pageStructure.find();

  if (populate.length > 0) {
    query = query.populate(populate.join(" "));
  }

  query.then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro desconhecido ocorreu ao buscar pageStructure."
      });
    });

};

exports.findOne = async (req, res) => {

  try {
    const className = req.params.className;
    const roleId = req.params.role;

    const userAuthorizationCode = req.header('Authorization');
    const accessToken = userAuthorizationCode.split(' ')[1];
    const decoded = jwt.decode(accessToken);

    const user = await req.databaseConnection.user.findOne({ UID: decoded.oid, role: { $in: [roleId] } }).exec();

    //Estou pegando user do banco de dados do cliente. Para verificar se esse cliente tem permissão para tais ambientes
    // O controle de ambientes e JSON não é do Security. O Security só controla os tenants.
    // Essa parada de Roles depende do tenant. Não existe caso que o usuário é admin de tudo e fodase.
    // Permissões são de acordo com cada banco de dados, simples assim

    console.log("Usuário encontrado: ", user);

    if (!user && !user.Roles) {
      return res.status(500).send({
        message:
          err.message || "Usuário não encontrado."
      });
    }

    const pageStructure = await req.databaseConnection.pageStructure.findOne({
      className: className,
      rolesHasAccess: { $in: [roleId] }
    });

    if (!pageStructure) {
      return res.status(404).json({ message: 'PageStructure não encontrado' });
    }

    res.status(200).json(pageStructure);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar PageStructure', error: error.message });
  }

};

// Altera uma entidade pageStructure
exports.update = async (req, res) => {

  // Validate required fields
  const camposRequeridosEmpty = validaCamposRequeridospageStructure(req);
  if (camposRequeridosEmpty.length > 0) {
    res.status(400).send({ message: "Campos requeridos (" + camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
    return;
  }

  const id = req.params.id;

  if (await checkIfDateIsOlderFunctions.hasUpdateConflict(id, req.body.updatedAt, req.databaseConnection.pageStructure) == true) {
    return res.status(409).json({ message: 'Conflito de atualização. O documento foi alterado por outra transação.' });
  }

  req.databaseConnection.pageStructure.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `A entidade pageStructure com id ${id} não encontrada, por isso não pode ser atualizada!`
        });
      } else res.send({ message: `A entidade pageStructure com id ${id} foi alterada com sucesso.` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro desconhecido ocorreu ao alterar a entidade pageStructure com o id " + id + "."
      });
    });
};

// Remove a entidade pageStructure por id
exports.delete = (req, res) => {

  const id = req.params.id;

  req.databaseConnection.pageStructure.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `A entidade pageStructure com id ${id} não encontrada, por isso não pode ser excluida!`
        });
      } else {
        res.send({
          message: `A entidade pageStructure com id ${id} foi excluída com sucesso.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro desconhecido ocorreu ao excluir a entidade pageStructure com o id " + id + "."
      });
    });
};

// Exclui todos os registros da entidade pageStructure
exports.deleteAll = (req, res) => {

  req.databaseConnection.pageStructure.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'pageStructure'}  foram excluídas!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades pageStructure."
      });
    });
};

exports.findCustom = async (req, res) => {
  const filterValues = req.body.filterValues;
  const filterConditions = req.body.filterValues;

  findDataByCustomQuery(filterValues, filterConditions, req.databaseConnection.pageStructure).then(data => {
    res.status(200).send(data);
  })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável"
      });
    });
};
