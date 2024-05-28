const db = require("../../models");
const Products = db.products;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade Products
exports.create = (req, res) => {

    // Create a Products
    const products = new Products({
        supplierIds: req.body.supplierIds ? req.body.supplierIds : null,
        productCode: req.body.productCode ? req.body.productCode : null,
        productName: req.body.productName ? req.body.productName : null,
        description: req.body.description ? req.body.description : null,
        standardCost: req.body.standardCost ? req.body.standardCost : null,
        listPrice: req.body.listPrice ? req.body.listPrice : null,
        reorderLevel: req.body.reorderLevel ? req.body.reorderLevel : null,
        targetLevel: req.body.targetLevel ? req.body.targetLevel : null,
        quantityPerUnit: req.body.quantityPerUnit ? req.body.quantityPerUnit : null,
        discontinued: req.body.discontinued ? req.body.discontinued : null,
        minimumReorderQuantity: req.body.minimumReorderQuantity ? req.body.minimumReorderQuantity : null,
        category: req.body.category ? req.body.category : null,
        attachments: req.body.attachments ? req.body.attachments : null,
    });

    // Save Products in the database
    products
        .save(products)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Products."
            });
        });
};

// Procura por todas as entidades do tipo Products
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.products.schema.obj); 
    let query = Products.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar Products." 
        }); 
    }); 
};

// Busca a entidade Products por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.products.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = Products.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado Products com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar Products com o id=" + id }); 
  }); 
};

// Altera uma entidade Products
exports.update = (req, res) => {

    const id = req.params.id;

    Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Products com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Products com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Products com o id " + id + "."
        });
      });
};

// Remove a entidade Products por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Products.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Products com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Products com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Products com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Products
exports.deleteAll = (req, res) => {

    Products.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Products'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Products."
        });
      });
};

// Procura por entidade Products onde o campo booleano discontinued seja true
exports.findAllDiscontinued = (req, res) => {

    Products.find({ discontinued: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Products por discontinued true."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, Products).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
