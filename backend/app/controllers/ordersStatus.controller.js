const db = require("../../models");
const OrdersStatus = db.ordersStatus;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade OrdersStatus
exports.create = (req, res) => {

    // Create a OrdersStatus
    const ordersStatus = new OrdersStatus({
        statusName: req.body.statusName ? req.body.statusName : null,
    });

    // Save OrdersStatus in the database
    ordersStatus
        .save(ordersStatus)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar OrdersStatus."
            });
        });
};

// Procura por todas as entidades do tipo OrdersStatus
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.ordersStatus.schema.obj); 
    let query = OrdersStatus.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar OrdersStatus." 
        }); 
    }); 
};

// Busca a entidade OrdersStatus por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.ordersStatus.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = OrdersStatus.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado OrdersStatus com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar OrdersStatus com o id=" + id }); 
  }); 
};

// Altera uma entidade OrdersStatus
exports.update = (req, res) => {

    const id = req.params.id;

    OrdersStatus.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade OrdersStatus com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade OrdersStatus com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade OrdersStatus com o id " + id + "."
        });
      });
};

// Remove a entidade OrdersStatus por id
exports.delete = (req, res) => {

    const id = req.params.id;

    OrdersStatus.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade OrdersStatus com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade OrdersStatus com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade OrdersStatus com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade OrdersStatus
exports.deleteAll = (req, res) => {

    OrdersStatus.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'OrdersStatus'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades OrdersStatus."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, OrdersStatus).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
