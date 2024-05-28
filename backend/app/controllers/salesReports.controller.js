const db = require("../../models");
const SalesReports = db.salesReports;
const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade SalesReports
exports.create = (req, res) => {

    // Create a SalesReports
    const salesReports = new SalesReports({
        display: req.body.display ? req.body.display : null,
        title: req.body.title ? req.body.title : null,
        filterRowSource: req.body.filterRowSource ? req.body.filterRowSource : null,
        padrao: req.body.padrao ? req.body.padrao : null,
    });

    // Save SalesReports in the database
    salesReports
        .save(salesReports)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar SalesReports."
            });
        });
};

// Procura por todas as entidades do tipo SalesReports
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.salesReports.schema.obj); 
    let query = SalesReports.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar SalesReports." 
        }); 
    }); 
};

// Busca a entidade SalesReports por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.salesReports.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = SalesReports.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado SalesReports com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar SalesReports com o id=" + id }); 
  }); 
};

// Altera uma entidade SalesReports
exports.update = (req, res) => {

    const id = req.params.id;

    SalesReports.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade SalesReports com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade SalesReports com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade SalesReports com o id " + id + "."
        });
      });
};

// Remove a entidade SalesReports por id
exports.delete = (req, res) => {

    const id = req.params.id;

    SalesReports.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade SalesReports com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade SalesReports com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade SalesReports com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade SalesReports
exports.deleteAll = (req, res) => {

    SalesReports.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'SalesReports'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades SalesReports."
        });
      });
};

// Procura por entidade SalesReports onde o campo booleano padrao seja true
exports.findAllPadrao = (req, res) => {

    SalesReports.find({ padrao: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar SalesReports por padrao true."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, SalesReports).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
}; 
