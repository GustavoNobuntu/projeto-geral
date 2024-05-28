const db = require("../../models");
const CompanyApplicationToken = db.companyApplicationToken;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade CompanyApplicationToken
exports.create = (req, res) => {

    // Create a CompanyApplicationToken
    const companyApplicationToken = new CompanyApplicationToken({
        company: req.body.company ? req.body.company : null,
        application: req.body.application ? req.body.application : null,
        token: req.body.token ? req.body.token : null,
    });

    // Save CompanyApplicationToken in the database
    companyApplicationToken
        .save(companyApplicationToken)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar CompanyApplicationToken."
            });
        });
};

// Procura por todas as entidades do tipo CompanyApplicationToken
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.companyApplicationToken.schema.obj); 
    let query = CompanyApplicationToken.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar CompanyApplicationToken." 
        }); 
    }); 
};

// Busca a entidade CompanyApplicationToken por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.companyApplicationToken.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = CompanyApplicationToken.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado CompanyApplicationToken com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar CompanyApplicationToken com o id=" + id }); 
  }); 
};

// Altera uma entidade CompanyApplicationToken
exports.update = (req, res) => {

    const id = req.params.id;

    CompanyApplicationToken.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade CompanyApplicationToken com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade CompanyApplicationToken com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade CompanyApplicationToken com o id " + id + "."
        });
      });
};

// Remove a entidade CompanyApplicationToken por id
exports.delete = (req, res) => {

    const id = req.params.id;

    CompanyApplicationToken.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade CompanyApplicationToken com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade CompanyApplicationToken com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade CompanyApplicationToken com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade CompanyApplicationToken
exports.deleteAll = (req, res) => {

    CompanyApplicationToken.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'CompanyApplicationToken'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades CompanyApplicationToken."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, CompanyApplicationToken).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
