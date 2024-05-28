const db = require("../../models");
const PurchaseOrderDetails = db.purchaseOrderDetails;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade PurchaseOrderDetails
exports.create = (req, res) => {

    // Create a PurchaseOrderDetails
    const purchaseOrderDetails = new PurchaseOrderDetails({
        purchaseOrder: req.body.purchaseOrder ? req.body.purchaseOrder : null,
        product: req.body.product ? req.body.product : null,
        quantity: req.body.quantity ? req.body.quantity : null,
        unitCost: req.body.unitCost ? req.body.unitCost : null,
        dateReceived: req.body.dateReceived ? req.body.dateReceived : null,
        postedToInventory: req.body.postedToInventory ? req.body.postedToInventory : null,
        inventory: req.body.inventory ? req.body.inventory : null
    });

    // Save PurchaseOrderDetails in the database
    purchaseOrderDetails
        .save(purchaseOrderDetails)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar PurchaseOrderDetails."
            });
        });
};

// Procura por todas as entidades do tipo PurchaseOrderDetails
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.purchaseOrderDetails.schema.obj); 
    let query = PurchaseOrderDetails.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar PurchaseOrderDetails." 
        }); 
    }); 
};

// Busca a entidade PurchaseOrderDetails por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.purchaseOrderDetails.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = PurchaseOrderDetails.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado PurchaseOrderDetails com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar PurchaseOrderDetails com o id=" + id }); 
  }); 
};

// Altera uma entidade PurchaseOrderDetails
exports.update = (req, res) => {

    const id = req.params.id;

    PurchaseOrderDetails.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade PurchaseOrderDetails com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade PurchaseOrderDetails com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade PurchaseOrderDetails com o id " + id + "."
        });
      });
};

// Remove a entidade PurchaseOrderDetails por id
exports.delete = (req, res) => {

    const id = req.params.id;

    PurchaseOrderDetails.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade PurchaseOrderDetails com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade PurchaseOrderDetails com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade PurchaseOrderDetails com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade PurchaseOrderDetails
exports.deleteAll = (req, res) => {

    PurchaseOrderDetails.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'PurchaseOrderDetails'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades PurchaseOrderDetails."
        });
      });
};

// Procura por entidade PurchaseOrderDetails onde o campo booleano postedToInventory seja true
exports.findAllPostedToInventory = (req, res) => {

    PurchaseOrderDetails.find({ postedToInventory: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar PurchaseOrderDetails por postedToInventory true."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, PurchaseOrderDetails).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
