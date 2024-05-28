const db = require("../../models");
const OrderDetails = db.orderDetails;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade OrderDetails
exports.create = (req, res) => {

    // Create a OrderDetails
    const orderDetails = new OrderDetails({
        order: req.body.order ? req.body.order : null,
        product: req.body.product ? req.body.product : null,
        quantity: req.body.quantity ? req.body.quantity : null,
        unitPrice: req.body.unitPrice ? req.body.unitPrice : null,
        discount: req.body.discount ? req.body.discount : null,
        status: req.body.status ? req.body.status : null,
        dateAllocated: req.body.dateAllocated ? req.body.dateAllocated : null,
        purchaseOrderId: req.body.purchaseOrderId ? req.body.purchaseOrderId : null,
        inventoryId: req.body.inventoryId ? req.body.inventoryId : null,
    });

    // Save OrderDetails in the database
    orderDetails
        .save(orderDetails)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar OrderDetails."
            });
        });
};

// Procura por todas as entidades do tipo OrderDetails
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.orderDetails.schema.obj); 
    let query = OrderDetails.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar OrderDetails." 
        }); 
    }); 
};

// Busca a entidade OrderDetails por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.orderDetails.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = OrderDetails.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado OrderDetails com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar OrderDetails com o id=" + id }); 
  }); 
};

// Altera uma entidade OrderDetails
exports.update = (req, res) => {

    const id = req.params.id;

    OrderDetails.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade OrderDetails com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade OrderDetails com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade OrderDetails com o id " + id + "."
        });
      });
};

// Remove a entidade OrderDetails por id
exports.delete = (req, res) => {

    const id = req.params.id;

    OrderDetails.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade OrderDetails com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade OrderDetails com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade OrderDetails com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade OrderDetails
exports.deleteAll = (req, res) => {

    OrderDetails.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'OrderDetails'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades OrderDetails."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, OrderDetails).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
