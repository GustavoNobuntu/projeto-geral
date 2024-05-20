const db = require("../../models");
const Garcon = db.garcon;

validaCamposRequeridosGarcon = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.nomeGarcon) {
        camposRequeridosEmpty.push("nomeGarcon");
    }
    if (!req.body.login) {
        camposRequeridosEmpty.push("login");
    }
    if (!req.body.senha) {
        camposRequeridosEmpty.push("senha");
    }
    if (!req.body.comissao) {
        camposRequeridosEmpty.push("comissao");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Garcon
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomeGarcon) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosGarcon(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Garcon
    const garcon = new Garcon({
        nomeGarcon: req.body.nomeGarcon ? req.body.nomeGarcon : null,
        login: req.body.login ? req.body.login : null,
        senha: req.body.senha ? req.body.senha : null,
        comissao: req.body.comissao ? req.body.comissao : null,
    });

    // Save Garcon in the database
    garcon
        .save(garcon)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Garcon."
            });
        });
};

// Procura por todas as entidades do tipo Garcon
exports.findAll = (req, res) => {
    var condition = {};

    Garcon.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Garcon."
        });
      });
};

// Busca a entidade Garcon por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    Garcon.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Garcon com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Garcon com o id " + id + "."
        });
      });
};

// Altera uma entidade Garcon
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosGarcon(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Garcon.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Garcon com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Garcon com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Garcon com o id " + id + "."
        });
      });
};

// Remove a entidade Garcon por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Garcon.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Garcon com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Garcon com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Garcon com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Garcon
exports.deleteAll = (req, res) => {

    Garcon.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Garcon'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Garcon."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
