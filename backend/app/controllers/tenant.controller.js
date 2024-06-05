const findDataByCustomQuery = require("../utils/customQuery.util");
const getSchemaRefs = require("../utils/getSchemaRefs.utils"); 

// Cria e salva um novo documento para a entidade Tenant
exports.create = (req, res) => {

    // Create a Tenant
    const tenant = new Tenant({
        name: req.body.name ? req.body.name : null,
    });

    // Save Tenant in the database
    tenant
        .save(tenant)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Tenant."
            });
        });
};

// Procura por todas as entidades do tipo Tenant
exports.findAll = (req, res) => {
    var condition = {};

    let populate = getSchemaRefs(db.tenant.schema.obj); 
    let query = Tenant.find(); 
    if (populate.length > 0) { 
        query = query.populate(populate.join(" ")); 
    } 
    query.then(data => { 
        res.send(data); 
    }).catch(err => { 
        res.status(500).send({ 
            message: 
            err.message || "Ocorreu um erro de servidor ao tentar buscar Tenant." 
        }); 
    }); 
};

// Busca a entidade Tenant por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

  let populate = getSchemaRefs(db.tenant.schema.obj); 

  // Se houver referências estrangeiras fazer o populate 
  let query = Tenant.findOne({ _id: id }); 
  if (populate.length > 0) { 
      query = query.populate(populate.join(" ")); 
  } 

  query.then(data => { 
      if (!data) { 
          res.status(404).send({ message: "Não foi encontrado Tenant com o id " + id }); 
      } else { 
          res.send(data); 
      } 
  }).catch(err => { 
      res.status(500).send({ message: "Erro ao buscar Tenant com o id=" + id }); 
  }); 
};

// Altera uma entidade Tenant
exports.update = (req, res) => {

    const id = req.params.id;

    Tenant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Tenant com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Tenant com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Tenant com o id " + id + "."
        });
      });
};

// Remove a entidade Tenant por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Tenant.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Tenant com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Tenant com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Tenant com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Tenant
exports.deleteAll = (req, res) => {

    Tenant.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Tenant'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Tenant."
        });
      });
};

exports.findCustom = async (req, res) => { 
  const filterValues = req.body.filterValues; 
  const filterConditions = req.body.filterValues; 

  findDataByCustomQuery(filterValues, filterConditions, Tenant).then(data => { 
    res.status(200).send(data); 
  }) 
  .catch(error => { 
    res.status(500).send({ 
      message: 
        error.message || "Algum erro desconhecido ocorreu ao buscar dados pela busca customizável" 
    }); 
  }); 
};

exports.findMultiple = (req, res) => {
    let ids = req.body.tenants;
    
    Tenant.find({
        '_id': { $in: ids }
    })
    .then(data => {
        let tenantDb = []
        data = data.map(tenant => {
            console.log(tenant.dbURI);
            tenantDb.push(tenant.dbURI);
        });
        res.send(tenantDb);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocorreu um erro de servidor ao tentar buscar Tenant."
        });
    });
}
