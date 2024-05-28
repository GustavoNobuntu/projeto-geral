const db = require("../../models");
const Invoices = db.invoices;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade Invoices
exports.create = (req, res) => {

    // Create a Invoices
    const invoices = new Invoices({
        order: req.body.order ? req.body.order : null,
        invoiceDate: req.body.invoiceDate ? req.body.invoiceDate : null,
        dueDate: req.body.dueDate ? req.body.dueDate : null,
        tax: req.body.tax ? req.body.tax : null,
        shipping: req.body.shipping ? req.body.shipping : null,
        amountDue: req.body.amountDue ? req.body.amountDue : null,
    });

    // Save Invoices in the database
    invoices
        .save(invoices)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Invoices."
            });
        });
};

// Procura por todas as entidades do tipo Invoices
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.invoices.schema.obj); 
    let query = Invoices.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar Invoices." 
        }); 
    }); 
};

// Busca a entidade Invoices por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.invoices.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = Invoices.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado Invoices com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar Invoices com o id=" + id }); 
  }); 
};

// Altera uma entidade Invoices
exports.update = (req, res) => {

    const id = req.params.id;

    Invoices.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Invoices com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Invoices com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Invoices com o id " + id + "."
        });
      });
};

// Remove a entidade Invoices por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Invoices.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Invoices com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Invoices com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Invoices com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Invoices
exports.deleteAll = (req, res) => {

    Invoices.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Invoices'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Invoices."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, Invoices).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
