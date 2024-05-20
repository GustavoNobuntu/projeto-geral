const db = require("../../models");
const CadastroCliente = db.cadastroCliente;

validaCamposRequeridosCadastroCliente = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.nomeCliente) {
        camposRequeridosEmpty.push("nomeCliente");
    }
    if (!req.body.sobrenomeCliente) {
        camposRequeridosEmpty.push("sobrenomeCliente");
    }
    if (!req.body.emailCliente) {
        camposRequeridosEmpty.push("emailCliente");
    }
    if (!req.body.emailclienteConfirma) {
        camposRequeridosEmpty.push("emailclienteConfirma");
    }
    if (!req.body.senhaCliente) {
        camposRequeridosEmpty.push("senhaCliente");
    }
    if (!req.body.senhaclienteConfirma) {
        camposRequeridosEmpty.push("senhaclienteConfirma");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade CadastroCliente
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomeCliente) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCadastroCliente(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a CadastroCliente
    const cadastroCliente = new CadastroCliente({
        nomeCliente: req.body.nomeCliente ? req.body.nomeCliente : null,
        sobrenomeCliente: req.body.sobrenomeCliente ? req.body.sobrenomeCliente : null,
        emailCliente: req.body.emailCliente ? req.body.emailCliente : null,
        emailclienteConfirma: req.body.emailclienteConfirma ? req.body.emailclienteConfirma : null,
        senhaCliente: req.body.senhaCliente ? req.body.senhaCliente : null,
        senhaclienteConfirma: req.body.senhaclienteConfirma ? req.body.senhaclienteConfirma : null,
    });

    // Save CadastroCliente in the database
    cadastroCliente
        .save(cadastroCliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar CadastroCliente."
            });
        });
};

// Procura por todas as entidades do tipo CadastroCliente
exports.findAll = (req, res) => {
    var condition = {};

    CadastroCliente.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar CadastroCliente."
        });
      });
};

// Busca a entidade CadastroCliente por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    CadastroCliente.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade CadastroCliente com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade CadastroCliente com o id " + id + "."
        });
      });
};

// Altera uma entidade CadastroCliente
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCadastroCliente(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    CadastroCliente.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade CadastroCliente com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade CadastroCliente com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade CadastroCliente com o id " + id + "."
        });
      });
};

// Remove a entidade CadastroCliente por id
exports.delete = (req, res) => {

    const id = req.params.id;

    CadastroCliente.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade CadastroCliente com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade CadastroCliente com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade CadastroCliente com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade CadastroCliente
exports.deleteAll = (req, res) => {

    CadastroCliente.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'CadastroCliente'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades CadastroCliente."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
