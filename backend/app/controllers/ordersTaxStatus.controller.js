const db = require("../../models");
const OrdersTaxStatus = db.ordersTaxStatus;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade OrdersTaxStatus
exports.create = (req, res) => {

    // Create a OrdersTaxStatus
    const ordersTaxStatus = new OrdersTaxStatus({
        taxStatusName: req.body.taxStatusName ? req.body.taxStatusName : null,
    });

    // Save OrdersTaxStatus in the database
    ordersTaxStatus
        .save(ordersTaxStatus)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar OrdersTaxStatus."
            });
        });
};

// Procura por todas as entidades do tipo OrdersTaxStatus
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.ordersTaxStatus.schema.obj); 
    let query = OrdersTaxStatus.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar OrdersTaxStatus." 
        }); 
    }); 
};

// Busca a entidade OrdersTaxStatus por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.ordersTaxStatus.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = OrdersTaxStatus.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado OrdersTaxStatus com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar OrdersTaxStatus com o id=" + id }); 
  }); 
};

// Altera uma entidade OrdersTaxStatus
exports.update = (req, res) => {

    const id = req.params.id;

    OrdersTaxStatus.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade OrdersTaxStatus com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade OrdersTaxStatus com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade OrdersTaxStatus com o id " + id + "."
        });
      });
};

// Remove a entidade OrdersTaxStatus por id
exports.delete = (req, res) => {

    const id = req.params.id;

    OrdersTaxStatus.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade OrdersTaxStatus com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade OrdersTaxStatus com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade OrdersTaxStatus com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade OrdersTaxStatus
exports.deleteAll = (req, res) => {

    OrdersTaxStatus.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'OrdersTaxStatus'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades OrdersTaxStatus."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, OrdersTaxStatus).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
