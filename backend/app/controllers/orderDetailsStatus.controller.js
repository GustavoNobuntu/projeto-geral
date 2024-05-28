const db = require("../../models");
const OrderDetailsStatus = db.orderDetailsStatus;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade OrderDetailsStatus
exports.create = (req, res) => {

    // Create a OrderDetailsStatus
    const orderDetailsStatus = new OrderDetailsStatus({
        statusName: req.body.statusName ? req.body.statusName : null,
    });

    // Save OrderDetailsStatus in the database
    orderDetailsStatus
        .save(orderDetailsStatus)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar OrderDetailsStatus."
            });
        });
};

// Procura por todas as entidades do tipo OrderDetailsStatus
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.orderDetailsStatus.schema.obj); 
    let query = OrderDetailsStatus.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar OrderDetailsStatus." 
        }); 
    }); 
};

// Busca a entidade OrderDetailsStatus por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.orderDetailsStatus.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = OrderDetailsStatus.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado OrderDetailsStatus com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar OrderDetailsStatus com o id=" + id }); 
  }); 
};

// Altera uma entidade OrderDetailsStatus
exports.update = (req, res) => {

    const id = req.params.id;

    OrderDetailsStatus.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade OrderDetailsStatus com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade OrderDetailsStatus com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade OrderDetailsStatus com o id " + id + "."
        });
      });
};

// Remove a entidade OrderDetailsStatus por id
exports.delete = (req, res) => {

    const id = req.params.id;

    OrderDetailsStatus.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade OrderDetailsStatus com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade OrderDetailsStatus com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade OrderDetailsStatus com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade OrderDetailsStatus
exports.deleteAll = (req, res) => {

    OrderDetailsStatus.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'OrderDetailsStatus'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades OrderDetailsStatus."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, OrderDetailsStatus).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
