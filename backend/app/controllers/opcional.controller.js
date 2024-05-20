const db = require("../../models");
const Opcional = db.opcional;

validaCamposRequeridosOpcional = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.nomeOpcional) {
        camposRequeridosEmpty.push("nomeOpcional");
    }
    if (!req.body.tipoOpcional) {
        camposRequeridosEmpty.push("tipoOpcional");
    }
    if (!req.body.maximaOpcionais) {
        camposRequeridosEmpty.push("maximaOpcionais");
    }
    if (!req.body.produto) {
        camposRequeridosEmpty.push("produto");
    }
    if (!req.body.categoria) {
        camposRequeridosEmpty.push("categoria");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Opcional
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomeOpcional) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosOpcional(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Opcional
    const opcional = new Opcional({
        nomeOpcional: req.body.nomeOpcional ? req.body.nomeOpcional : null,
        tipoOpcional: req.body.tipoOpcional ? req.body.tipoOpcional : null,
        maximaOpcionais: req.body.maximaOpcionais ? req.body.maximaOpcionais : null,
        produto: req.body.produto ? req.body.produto : null,
        categoria: req.body.categoria ? req.body.categoria.id : null
    });

    // Save Opcional in the database
    opcional
        .save(opcional)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Opcional."
            });
        });
};

// Procura por todas as entidades do tipo Opcional
exports.findAll = (req, res) => {
    var condition = {};

    Opcional.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Opcional."
        });
      });
};

// Busca a entidade Opcional por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    Opcional.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Opcional com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Opcional com o id " + id + "."
        });
      });
};

// Altera uma entidade Opcional
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosOpcional(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Opcional.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Opcional com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Opcional com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Opcional com o id " + id + "."
        });
      });
};

// Remove a entidade Opcional por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Opcional.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Opcional com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Opcional com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Opcional com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Opcional
exports.deleteAll = (req, res) => {

    Opcional.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Opcional'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Opcional."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
