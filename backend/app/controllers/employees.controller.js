const db = require("../../models");
const Employees = db.employees;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade Employees
exports.create = (req, res) => {

    // Create a Employees
    const employees = new Employees({
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

    // Save Employees in the database
    employees
        .save(employees)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Employees."
            });
        });
};

// Procura por todas as entidades do tipo Employees
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.employees.schema.obj); 
    let query = Employees.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar Employees." 
        }); 
    }); 
};

// Busca a entidade Employees por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.employees.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = Employees.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado Employees com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar Employees com o id=" + id }); 
  }); 
};

// Altera uma entidade Employees
exports.update = (req, res) => {

    const id = req.params.id;

    Employees.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Employees com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Employees com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Employees com o id " + id + "."
        });
      });
};

// Remove a entidade Employees por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Employees.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Employees com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Employees com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Employees com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Employees
exports.deleteAll = (req, res) => {

    Employees.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Employees'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Employees."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, Employees).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
