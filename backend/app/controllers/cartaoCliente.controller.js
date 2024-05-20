const db = require("../../models");
const CartaoCliente = db.cartaoCliente;

validaCamposRequeridosCartaoCliente = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.numeroCartao) {
        camposRequeridosEmpty.push("numeroCartao");
    }
    if (!req.body.nomeImpresso) {
        camposRequeridosEmpty.push("nomeImpresso");
    }
    if (!req.body.anoValidade) {
        camposRequeridosEmpty.push("anoValidade");
    }
    if (!req.body.mesValidade) {
        camposRequeridosEmpty.push("mesValidade");
    }
    if (!req.body.diaValidade) {
        camposRequeridosEmpty.push("diaValidade");
    }
    if (!req.body.cvv) {
        camposRequeridosEmpty.push("cvv");
    }
    if (!req.body.pedidoCartao) {
        camposRequeridosEmpty.push("pedidoCartao");
    }
    if (!req.body.cpfcnpj) {
        camposRequeridosEmpty.push("cpfcnpj");
    }
    if (!req.body.tipoPagamento) {
        camposRequeridosEmpty.push("tipoPagamento");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade CartaoCliente
exports.create = (req, res) => {
    // Validate request
    if (!req.body.numeroCartao) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCartaoCliente(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a CartaoCliente
    const cartaoCliente = new CartaoCliente({
        numeroCartao: req.body.numeroCartao ? req.body.numeroCartao : null,
        nomeImpresso: req.body.nomeImpresso ? req.body.nomeImpresso : null,
        anoValidade: req.body.anoValidade ? req.body.anoValidade : null,
        mesValidade: req.body.mesValidade ? req.body.mesValidade : null,
        diaValidade: req.body.diaValidade ? req.body.diaValidade : null,
        cvv: req.body.cvv ? req.body.cvv : null,
        pedidoCartao: req.body.pedidoCartao ? req.body.pedidoCartao : null,
        cpfcnpj: req.body.cpfcnpj ? req.body.cpfcnpj : null,
        tipoPagamento: req.body.tipoPagamento ? req.body.tipoPagamento : null
    });

    // Save CartaoCliente in the database
    cartaoCliente
        .save(cartaoCliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar CartaoCliente."
            });
        });
};

// Procura por todas as entidades do tipo CartaoCliente
exports.findAll = (req, res) => {
    var condition = {};

    CartaoCliente.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar CartaoCliente."
        });
      });
};

// Busca a entidade CartaoCliente por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    CartaoCliente.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade CartaoCliente com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade CartaoCliente com o id " + id + "."
        });
      });
};

// Altera uma entidade CartaoCliente
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCartaoCliente(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    CartaoCliente.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade CartaoCliente com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade CartaoCliente com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade CartaoCliente com o id " + id + "."
        });
      });
};

// Remove a entidade CartaoCliente por id
exports.delete = (req, res) => {

    const id = req.params.id;

    CartaoCliente.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade CartaoCliente com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade CartaoCliente com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade CartaoCliente com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade CartaoCliente
exports.deleteAll = (req, res) => {

    CartaoCliente.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'CartaoCliente'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades CartaoCliente."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
