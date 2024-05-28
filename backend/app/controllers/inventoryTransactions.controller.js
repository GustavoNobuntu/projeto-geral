const db = require("../../models");
const InventoryTransactions = db.inventoryTransaction;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade InventoryTransactions
exports.create = (req, res) => {

    // Create a InventoryTransactions
    const inventoryTransactions = new InventoryTransactions({
        transactionType: req.body.transactionType ? req.body.transactionType : null,
        transactionCreatedDate: req.body.transactionCreatedDate ? req.body.transactionCreatedDate : null,
        transactionModifiedDate: req.body.transactionModifiedDate ? req.body.transactionModifiedDate : null,
        product: req.body.product ? req.body.product : null,
        quantity: req.body.quantity ? req.body.quantity : null,
        purchaseOrder: req.body.purchaseOrder ? req.body.purchaseOrder : null,
        customerOrder: req.body.customerOrder ? req.body.customerOrder : null,
        comments: req.body.comments ? req.body.comments : null,
    });

    // Save InventoryTransactions in the database
    inventoryTransactions
        .save(inventoryTransactions)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar InventoryTransactions."
            });
        });
};

// Procura por todas as entidades do tipo InventoryTransactions
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.inventoryTransaction.schema.obj); 
    let query = InventoryTransactions.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar InventoryTransactions." 
        }); 
    }); 
};

// Busca a entidade InventoryTransactions por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.inventoryTransaction.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = InventoryTransactions.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado InventoryTransactions com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar InventoryTransactions com o id=" + id }); 
  }); 
};

// Altera uma entidade InventoryTransactions
exports.update = (req, res) => {

    const id = req.params.id;

    InventoryTransactions.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade InventoryTransactions com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade InventoryTransactions com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade InventoryTransactions com o id " + id + "."
        });
      });
};

// Remove a entidade InventoryTransactions por id
exports.delete = (req, res) => {

    const id = req.params.id;

    InventoryTransactions.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade InventoryTransactions com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade InventoryTransactions com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade InventoryTransactions com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade InventoryTransactions
exports.deleteAll = (req, res) => {

    InventoryTransactions.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'InventoryTransactions'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades InventoryTransactions."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, InventoryTransactions).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
