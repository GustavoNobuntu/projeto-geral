const db = require("../../models");
const Orders = db.orders;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade Orders
exports.create = (req, res) => {

    // Create a Orders
    const orders = new Orders({
        employee: req.body.employee ? req.body.employee : null,
        customer: req.body.customer ? req.body.customer : null,
        orderDate: req.body.orderDate ? req.body.orderDate : null,
        shippedDate: req.body.shippedDate ? req.body.shippedDate : null,
        shipper: req.body.shipper ? req.body.shipper : null,
        shipName: req.body.shipName ? req.body.shipName : null,
        shipAddress: req.body.shipAddress ? req.body.shipAddress : null,
        shipCity: req.body.shipCity ? req.body.shipCity : null,
        shipStateProvince: req.body.shipStateProvince ? req.body.shipStateProvince : null,
        shipZipPostalCode: req.body.shipZipPostalCode ? req.body.shipZipPostalCode : null,
        shipCountryRegion: req.body.shipCountryRegion ? req.body.shipCountryRegion : null,
        shippingFee: req.body.shippingFee ? req.body.shippingFee : null,
        taxes: req.body.taxes ? req.body.taxes : null,
        paymentType: req.body.paymentType ? req.body.paymentType : null,
        paidDate: req.body.paidDate ? req.body.paidDate : null,
        notes: req.body.notes ? req.body.notes : null,
        taxRate: req.body.taxRate ? req.body.taxRate : null,
        taxStatus: req.body.taxStatus ? req.body.taxStatus : null,
        status: req.body.status ? req.body.status : null,
        orderDetails: req.body.orderDetails ? req.body.orderDetails : null
    });

    // Save Orders in the database
    orders
        .save(orders)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Orders."
            });
        });
};

// Procura por todas as entidades do tipo Orders
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.orders.schema.obj); 
    let query = Orders.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar Orders." 
        }); 
    }); 
};

// Busca a entidade Orders por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.orders.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = Orders.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado Orders com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar Orders com o id=" + id }); 
  }); 
};

// Altera uma entidade Orders
exports.update = (req, res) => {

    const id = req.params.id;

    Orders.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Orders com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Orders com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Orders com o id " + id + "."
        });
      });
};

// Remove a entidade Orders por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Orders.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Orders com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Orders com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Orders com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Orders
exports.deleteAll = (req, res) => {

    Orders.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Orders'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Orders."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, Orders).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
