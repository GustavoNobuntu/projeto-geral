const db = require("../../models");
const PurchaseOrders = db.purchaseOrders;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade PurchaseOrders
exports.create = (req, res) => {

    // Create a PurchaseOrders
    const purchaseOrders = new PurchaseOrders({
        supplier: req.body.supplier ? req.body.supplier : null,
        createdBy: req.body.createdBy ? req.body.createdBy : null,
        submittedDate: req.body.submittedDate ? req.body.submittedDate : null,
        creationDate: req.body.creationDate ? req.body.creationDate : null,
        status: req.body.status ? req.body.status : null,
        expectedDate: req.body.expectedDate ? req.body.expectedDate : null,
        shippingFee: req.body.shippingFee ? req.body.shippingFee : null,
        taxes: req.body.taxes ? req.body.taxes : null,
        paymentDate: req.body.paymentDate ? req.body.paymentDate : null,
        paymentAmount: req.body.paymentAmount ? req.body.paymentAmount : null,
        paymentMethod: req.body.paymentMethod ? req.body.paymentMethod : null,
        notes: req.body.notes ? req.body.notes : null,
        approvedBy: req.body.approvedBy ? req.body.approvedBy : null,
        approvedDate: req.body.approvedDate ? req.body.approvedDate : null,
        submittedBy: req.body.submittedBy ? req.body.submittedBy : null,
        purchaseOrderDetails: req.body.purchaseOrderDetails ? req.body.purchaseOrderDetails : null
    });

    // Save PurchaseOrders in the database
    purchaseOrders
        .save(purchaseOrders)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar PurchaseOrders."
            });
        });
};

// Procura por todas as entidades do tipo PurchaseOrders
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.purchaseOrders.schema.obj); 
    let query = PurchaseOrders.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar PurchaseOrders." 
        }); 
    }); 
};

// Busca a entidade PurchaseOrders por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.purchaseOrders.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = PurchaseOrders.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado PurchaseOrders com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar PurchaseOrders com o id=" + id }); 
  }); 
};

// Altera uma entidade PurchaseOrders
exports.update = (req, res) => {

    const id = req.params.id;

    PurchaseOrders.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade PurchaseOrders com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade PurchaseOrders com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade PurchaseOrders com o id " + id + "."
        });
      });
};

// Remove a entidade PurchaseOrders por id
exports.delete = (req, res) => {

    const id = req.params.id;

    PurchaseOrders.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade PurchaseOrders com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade PurchaseOrders com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade PurchaseOrders com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade PurchaseOrders
exports.deleteAll = (req, res) => {

    PurchaseOrders.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'PurchaseOrders'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades PurchaseOrders."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, PurchaseOrders).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
