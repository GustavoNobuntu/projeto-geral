const db = require("../../models");
const getSchemaRefs = require("../../utils/populate.utils");
const Produto = db.produto;

validaCamposRequeridosProduto = (req) => {
  const camposRequeridosEmpty = new Array();
  if (!req.body.nomeProduto) {
    camposRequeridosEmpty.push("nomeProduto");
  }
  if (!req.body.codigo) {
    camposRequeridosEmpty.push("codigo");
  }
  if (!req.body.descricaoProduto) {
    camposRequeridosEmpty.push("descricaoProduto");
  }
  if (!req.body.precoProduto) {
    camposRequeridosEmpty.push("precoProduto");
  }
  if (!req.body.imagem) {
    camposRequeridosEmpty.push("imagem");
  }
  if (!req.body.categoria) {
    camposRequeridosEmpty.push("categoria");
  }
  if (!req.body.opcional) {
    camposRequeridosEmpty.push("opcional");
  }
  return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Produto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nomeProduto) {
    res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
    return;
  }

  // Validate required fields
  const camposRequeridosEmpty = validaCamposRequeridosProduto(req);
  if (camposRequeridosEmpty.length > 0) {
    res.status(400).send({ message: "Campos requeridos (" + camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
    return;
  }

  // Create a Produto
  const produto = new Produto({
    nomeProduto: req.body.nomeProduto ? req.body.nomeProduto : null,
    codigo: req.body.codigo ? req.body.codigo : null,
    descricaoProduto: req.body.descricaoProduto ? req.body.descricaoProduto : null,
    precoProduto: req.body.precoProduto ? req.body.precoProduto : null,
    imagem: req.body.imagem ? req.body.imagem : null,
    categoria: req.body.categoria ? req.body.categoria.id : null,
    opcional: req.body.opcional ? req.body.opcional.id : null
  });

  // Save Produto in the database
  produto
    .save(produto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro de servidor ao tentar salvar Produto."
      });
    });
};

// Procura por todas as entidades do tipo Produto
exports.findAll = (req, res) => {
  let populate = getSchemaRefs(db.produto.schema.obj);
  let query = Produto.find();

  if (populate.length > 0) {
    query = query.populate(populate.join(" "));
  }

  query.then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Algum erro desconhecido ocorreu ao buscar Produto."
    });
  });

};

// Busca a entidade Produto por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Produto.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "A entidade Produto com id " + id + " não encontrada!" });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro desconhecido ocorreu ao buscar a entidade Produto com o id " + id + "."
      });
    });
};

// Altera uma entidade Produto
exports.update = (req, res) => {

  // Validate required fields
  const camposRequeridosEmpty = validaCamposRequeridosProduto(req);
  if (camposRequeridosEmpty.length > 0) {
    res.status(400).send({ message: "Campos requeridos (" + camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
    return;
  }

  const id = req.params.id;

  Produto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `A entidade Produto com id ${id} não encontrada, por isso não pode ser atualizada!`
        });
      } else res.send({ message: `A entidade Produto com id ${id} foi alterada com sucesso.` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro desconhecido ocorreu ao alterar a entidade Produto com o id " + id + "."
      });
    });
};

// Remove a entidade Produto por id
exports.delete = (req, res) => {

  const id = req.params.id;

  Produto.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `A entidade Produto com id ${id} não encontrada, por isso não pode ser excluida!`
        });
      } else {
        res.send({
          message: `A entidade Produto com id ${id} foi excluída com sucesso.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro desconhecido ocorreu ao excluir a entidade Produto com o id " + id + "."
      });
    });
};

// Exclui todos os registros da entidade Produto
exports.deleteAll = (req, res) => {

  Produto.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Produto'}  foram excluídas!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Produto."
      });
    });
};

exports.findCustom = (req, res) => {
  findCustom(req, res, Orders);
};
