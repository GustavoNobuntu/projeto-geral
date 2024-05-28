const db = require("../../models");
const InventoryTransactionTypes = db.inventoryTransactionTypes;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade InventoryTransactionTypes
exports.create = (req, res) => {

    // Create a InventoryTransactionTypes
    const inventoryTransactionTypes = new InventoryTransactionTypes({
        typeName: req.body.typeName ? req.body.typeName : null,
    });

    // Save InventoryTransactionTypes in the database
    inventoryTransactionTypes
        .save(inventoryTransactionTypes)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar InventoryTransactionTypes."
            });
        });
};

// Procura por todas as entidades do tipo InventoryTransactionTypes
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.inventoryTransactionTypes.schema.obj); 
    let query = InventoryTransactionTypes.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar InventoryTransactionTypes." 
        }); 
    }); 
};

// Busca a entidade InventoryTransactionTypes por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.inventoryTransactionTypes.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = InventoryTransactionTypes.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado InventoryTransactionTypes com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar InventoryTransactionTypes com o id=" + id }); 
  }); 
};

// Altera uma entidade InventoryTransactionTypes
exports.update = (req, res) => {

    const id = req.params.id;

    InventoryTransactionTypes.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade InventoryTransactionTypes com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade InventoryTransactionTypes com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade InventoryTransactionTypes com o id " + id + "."
        });
      });
};

// Remove a entidade InventoryTransactionTypes por id
exports.delete = (req, res) => {

    const id = req.params.id;

    InventoryTransactionTypes.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade InventoryTransactionTypes com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade InventoryTransactionTypes com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade InventoryTransactionTypes com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade InventoryTransactionTypes
exports.deleteAll = (req, res) => {

    InventoryTransactionTypes.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'InventoryTransactionTypes'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades InventoryTransactionTypes."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, InventoryTransactionTypes).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
