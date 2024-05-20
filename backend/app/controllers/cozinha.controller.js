const db = require("../../models");
const Cozinha = db.cozinha;

validaCamposRequeridosCozinha = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.nomePedido) {
        camposRequeridosEmpty.push("nomePedido");
    }
    if (!req.body.dataHora) {
        camposRequeridosEmpty.push("dataHora");
    }
    if (!req.body.statusPedido) {
        camposRequeridosEmpty.push("statusPedido");
    }
    if (!req.body.itemPedido) {
        camposRequeridosEmpty.push("itemPedido");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Cozinha
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomePedido) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCozinha(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Cozinha
    const cozinha = new Cozinha({
        nomePedido: req.body.nomePedido ? req.body.nomePedido : null,
        dataHora: req.body.dataHora ? req.body.dataHora : null,
        statusPedido: req.body.statusPedido ? req.body.statusPedido : null,
        itemPedido: req.body.itemPedido ? req.body.itemPedido : null
    });

    // Save Cozinha in the database
    cozinha
        .save(cozinha)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Cozinha."
            });
        });
};

// Procura por todas as entidades do tipo Cozinha
exports.findAll = (req, res) => {
    var condition = {};

    Cozinha.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Cozinha."
        });
      });
};

// Busca a entidade Cozinha por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    Cozinha.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Cozinha com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Cozinha com o id " + id + "."
        });
      });
};

// Altera uma entidade Cozinha
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCozinha(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Cozinha.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Cozinha com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Cozinha com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Cozinha com o id " + id + "."
        });
      });
};

// Remove a entidade Cozinha por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Cozinha.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Cozinha com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Cozinha com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Cozinha com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Cozinha
exports.deleteAll = (req, res) => {

    Cozinha.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Cozinha'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Cozinha."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
