const db = require("../../models");
const Shippers = db.shippers;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade Shippers
exports.create = (req, res) => {

    // Create a Shippers
    const shippers = new Shippers({
        company: req.body.company ? req.body.company : null,
        lastName: req.body.lastName ? req.body.lastName : null,
        firstName: req.body.firstName ? req.body.firstName : null,
        emailAddress: req.body.emailAddress ? req.body.emailAddress : null,
        jobTitle: req.body.jobTitle ? req.body.jobTitle : null,
        businessPhone: req.body.businessPhone ? req.body.businessPhone : null,
        homePhone: req.body.homePhone ? req.body.homePhone : null,
        mobilePhone: req.body.mobilePhone ? req.body.mobilePhone : null,
        faxNumber: req.body.faxNumber ? req.body.faxNumber : null,
        address: req.body.address ? req.body.address : null,
        city: req.body.city ? req.body.city : null,
        stateProvince: req.body.stateProvince ? req.body.stateProvince : null,
        zipPostalCode: req.body.zipPostalCode ? req.body.zipPostalCode : null,
        countryRegion: req.body.countryRegion ? req.body.countryRegion : null,
        webPage: req.body.webPage ? req.body.webPage : null,
        notes: req.body.notes ? req.body.notes : null,
        attachments: req.body.attachments ? req.body.attachments : null,
    });

    // Save Shippers in the database
    shippers
        .save(shippers)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Shippers."
            });
        });
};

// Procura por todas as entidades do tipo Shippers
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.shippers.schema.obj); 
    let query = Shippers.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar Shippers." 
        }); 
    }); 
};

// Busca a entidade Shippers por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.shippers.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = Shippers.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado Shippers com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar Shippers com o id=" + id }); 
  }); 
};

// Altera uma entidade Shippers
exports.update = (req, res) => {

    const id = req.params.id;

    Shippers.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Shippers com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Shippers com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Shippers com o id " + id + "."
        });
      });
};

// Remove a entidade Shippers por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Shippers.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Shippers com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Shippers com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Shippers com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Shippers
exports.deleteAll = (req, res) => {

    Shippers.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Shippers'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Shippers."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, Shippers).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
