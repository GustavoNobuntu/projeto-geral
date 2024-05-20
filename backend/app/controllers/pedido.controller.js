const db = require("../../models");
const Pedido = db.pedido;

validaCamposRequeridosPedido = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.pedidoCancelado) {
        camposRequeridosEmpty.push("pedidoCancelado");
    }
    if (!req.body.datahoraPedido) {
        camposRequeridosEmpty.push("datahoraPedido");
    }
    if (!req.body.pagamento) {
        camposRequeridosEmpty.push("pagamento");
    }
    if (!req.body.garcon) {
        camposRequeridosEmpty.push("garcon");
    }
    if (!req.body.itemPedido) {
        camposRequeridosEmpty.push("itemPedido");
    }
    if (!req.body.cartaoConsumo) {
        camposRequeridosEmpty.push("cartaoConsumo");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Pedido
exports.create = (req, res) => {
    // Validate request
    if (!req.body.pedidoCancelado) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosPedido(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Pedido
    const pedido = new Pedido({
        pedidoCancelado: req.body.pedidoCancelado ? req.body.pedidoCancelado : null,
        datahoraPedido: req.body.datahoraPedido ? req.body.datahoraPedido : null,
        pagamento: req.body.pagamento ? req.body.pagamento.id : null,
        garcon: req.body.garcon ? req.body.garcon.id : null,
        itemPedido: req.body.itemPedido ? req.body.itemPedido.id : null,
        cartaoConsumo: req.body.cartaoConsumo ? req.body.cartaoConsumo.id : null
    });

    // Save Pedido in the database
    pedido
        .save(pedido)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Pedido."
            });
        });
};

// Procura por todas as entidades do tipo Pedido
exports.findAll = (req, res) => {
    var condition = {};

    Pedido.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Pedido."
        });
      });
};

// Busca a entidade Pedido por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    Pedido.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Pedido com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Pedido com o id " + id + "."
        });
      });
};

// Altera uma entidade Pedido
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosPedido(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Pedido.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Pedido com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Pedido com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Pedido com o id " + id + "."
        });
      });
};

// Remove a entidade Pedido por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Pedido.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Pedido com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Pedido com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Pedido com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Pedido
exports.deleteAll = (req, res) => {

    Pedido.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Pedido'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Pedido."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
