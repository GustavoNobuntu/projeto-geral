const db = require("../../models");
const PurchaseOrderStatus = db.purchaseOrderStatus;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade PurchaseOrderStatus
exports.create = (req, res) => {

    // Create a PurchaseOrderStatus
    const purchaseOrderStatus = new PurchaseOrderStatus({
        status: req.body.status ? req.body.status : null,
    });

    // Save PurchaseOrderStatus in the database
    purchaseOrderStatus
        .save(purchaseOrderStatus)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar PurchaseOrderStatus."
            });
        });
};

// Procura por todas as entidades do tipo PurchaseOrderStatus
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.purchaseOrderStatus.schema.obj); 
    let query = PurchaseOrderStatus.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar PurchaseOrderStatus." 
        }); 
    }); 
};

// Busca a entidade PurchaseOrderStatus por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.purchaseOrderStatus.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = PurchaseOrderStatus.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado PurchaseOrderStatus com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar PurchaseOrderStatus com o id=" + id }); 
  }); 
};

// Altera uma entidade PurchaseOrderStatus
exports.update = (req, res) => {

    const id = req.params.id;

    PurchaseOrderStatus.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade PurchaseOrderStatus com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade PurchaseOrderStatus com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade PurchaseOrderStatus com o id " + id + "."
        });
      });
};

// Remove a entidade PurchaseOrderStatus por id
exports.delete = (req, res) => {

    const id = req.params.id;

    PurchaseOrderStatus.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade PurchaseOrderStatus com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade PurchaseOrderStatus com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade PurchaseOrderStatus com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade PurchaseOrderStatus
exports.deleteAll = (req, res) => {

    PurchaseOrderStatus.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'PurchaseOrderStatus'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades PurchaseOrderStatus."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, PurchaseOrderStatus).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
