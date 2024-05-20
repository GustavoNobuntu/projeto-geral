const db = require("../../models");
const Categoria = db.categoria;

validaCamposRequeridosCategoria = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.nomeCategoria) {
        camposRequeridosEmpty.push("nomeCategoria");
    }
    if (!req.body.usaopcoesTamanho) {
        camposRequeridosEmpty.push("usaopcoesTamanho");
    }
    if (!req.body.usaopcoesBorda) {
        camposRequeridosEmpty.push("usaopcoesBorda");
    }
    if (!req.body.setor) {
        camposRequeridosEmpty.push("setor");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Categoria
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomeCategoria) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCategoria(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Categoria
    const categoria = new Categoria({
        nomeCategoria: req.body.nomeCategoria ? req.body.nomeCategoria : null,
        usaopcoesTamanho: req.body.usaopcoesTamanho ? req.body.usaopcoesTamanho : null,
        usaopcoesBorda: req.body.usaopcoesBorda ? req.body.usaopcoesBorda : null,
        setor: req.body.setor ? req.body.setor : null,
    });

    // Save Categoria in the database
    categoria
        .save(categoria)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Categoria."
            });
        });
};

// Procura por todas as entidades do tipo Categoria
exports.findAll = (req, res) => {
    var condition = {};

    Categoria.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Categoria."
        });
      });
};

// Busca a entidade Categoria por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    Categoria.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Categoria com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Categoria com o id " + id + "."
        });
      });
};

// Altera uma entidade Categoria
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCategoria(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Categoria.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Categoria com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Categoria com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Categoria com o id " + id + "."
        });
      });
};

// Remove a entidade Categoria por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Categoria.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Categoria com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Categoria com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Categoria com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Categoria
exports.deleteAll = (req, res) => {

    Categoria.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Categoria'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Categoria."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
