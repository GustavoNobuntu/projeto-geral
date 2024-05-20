const db = require("../../models");
const Endereco = db.endereco;

validaCamposRequeridosEndereco = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.rua) {
        camposRequeridosEmpty.push("rua");
    }
    if (!req.body.bairro) {
        camposRequeridosEmpty.push("bairro");
    }
    if (!req.body.cidade) {
        camposRequeridosEmpty.push("cidade");
    }
    if (!req.body.numeroMoradia) {
        camposRequeridosEmpty.push("numeroMoradia");
    }
    if (!req.body.cep) {
        camposRequeridosEmpty.push("cep");
    }
    if (!req.body.complemento) {
        camposRequeridosEmpty.push("complemento");
    }
    if (!req.body.cadastroCliente) {
        camposRequeridosEmpty.push("cadastroCliente");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Endereco
exports.create = (req, res) => {
    // Validate request
    if (!req.body.rua) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosEndereco(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Endereco
    const endereco = new Endereco({
        rua: req.body.rua ? req.body.rua : null,
        bairro: req.body.bairro ? req.body.bairro : null,
        cidade: req.body.cidade ? req.body.cidade : null,
        numeroMoradia: req.body.numeroMoradia ? req.body.numeroMoradia : null,
        cep: req.body.cep ? req.body.cep : null,
        complemento: req.body.complemento ? req.body.complemento : null,
        cadastroCliente: req.body.cadastroCliente ? req.body.cadastroCliente.id : null
    });

    // Save Endereco in the database
    endereco
        .save(endereco)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Endereco."
            });
        });
};

// Procura por todas as entidades do tipo Endereco
exports.findAll = (req, res) => {
    var condition = {};

    Endereco.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Endereco."
        });
      });
};

// Busca a entidade Endereco por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    Endereco.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Endereco com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Endereco com o id " + id + "."
        });
      });
};

// Altera uma entidade Endereco
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosEndereco(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Endereco.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Endereco com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Endereco com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Endereco com o id " + id + "."
        });
      });
};

// Remove a entidade Endereco por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Endereco.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Endereco com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Endereco com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Endereco com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Endereco
exports.deleteAll = (req, res) => {

    Endereco.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Endereco'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Endereco."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
