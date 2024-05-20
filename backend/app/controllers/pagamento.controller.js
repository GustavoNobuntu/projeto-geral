const db = require("../../models");
const Pagamento = db.pagamento;

validaCamposRequeridosPagamento = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.valorPagamento) {
        camposRequeridosEmpty.push("valorPagamento");
    }
    if (!req.body.datahoraPagamento) {
        camposRequeridosEmpty.push("datahoraPagamento");
    }
    if (!req.body.tipoPagamento) {
        camposRequeridosEmpty.push("tipoPagamento");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Pagamento
exports.create = (req, res) => {
    // Validate request
    if (!req.body.valorPagamento) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosPagamento(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Pagamento
    const pagamento = new Pagamento({
        valorPagamento: req.body.valorPagamento ? req.body.valorPagamento : null,
        datahoraPagamento: req.body.datahoraPagamento ? req.body.datahoraPagamento : null,
        tipoPagamento: req.body.tipoPagamento ? req.body.tipoPagamento.id : null
    });

    // Save Pagamento in the database
    pagamento
        .save(pagamento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Pagamento."
            });
        });
};

// Procura por todas as entidades do tipo Pagamento
exports.findAll = (req, res) => {
    var condition = {};

    Pagamento.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Pagamento."
        });
      });
};

// Busca a entidade Pagamento por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    Pagamento.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Pagamento com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Pagamento com o id " + id + "."
        });
      });
};

// Altera uma entidade Pagamento
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosPagamento(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Pagamento.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Pagamento com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Pagamento com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Pagamento com o id " + id + "."
        });
      });
};

// Remove a entidade Pagamento por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Pagamento.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Pagamento com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Pagamento com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Pagamento com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Pagamento
exports.deleteAll = (req, res) => {

    Pagamento.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Pagamento'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Pagamento."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
