const db = require("../../models");
const ItemPedido = db.itemPedido;

validaCamposRequeridosItemPedido = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.nomePedido) {
        camposRequeridosEmpty.push("nomePedido");
    }
    if (!req.body.descricao) {
        camposRequeridosEmpty.push("descricao");
    }
    if (!req.body.quantidadePedido) {
        camposRequeridosEmpty.push("quantidadePedido");
    }
    if (!req.body.precoPedido) {
        camposRequeridosEmpty.push("precoPedido");
    }
    if (!req.body.numeroMesa) {
        camposRequeridosEmpty.push("numeroMesa");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade ItemPedido
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomePedido) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosItemPedido(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a ItemPedido
    const itemPedido = new ItemPedido({
        nomePedido: req.body.nomePedido ? req.body.nomePedido : null,
        descricao: req.body.descricao ? req.body.descricao : null,
        quantidadePedido: req.body.quantidadePedido ? req.body.quantidadePedido : null,
        precoPedido: req.body.precoPedido ? req.body.precoPedido : null,
        numeroMesa: req.body.numeroMesa ? req.body.numeroMesa : null,
    });

    // Save ItemPedido in the database
    itemPedido
        .save(itemPedido)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar ItemPedido."
            });
        });
};

// Procura por todas as entidades do tipo ItemPedido
exports.findAll = (req, res) => {
    var condition = {};

    ItemPedido.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar ItemPedido."
        });
      });
};

// Busca a entidade ItemPedido por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    ItemPedido.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade ItemPedido com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade ItemPedido com o id " + id + "."
        });
      });
};

// Altera uma entidade ItemPedido
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosItemPedido(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    ItemPedido.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade ItemPedido com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade ItemPedido com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade ItemPedido com o id " + id + "."
        });
      });
};

// Remove a entidade ItemPedido por id
exports.delete = (req, res) => {

    const id = req.params.id;

    ItemPedido.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade ItemPedido com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade ItemPedido com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade ItemPedido com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade ItemPedido
exports.deleteAll = (req, res) => {

    ItemPedido.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'ItemPedido'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades ItemPedido."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
