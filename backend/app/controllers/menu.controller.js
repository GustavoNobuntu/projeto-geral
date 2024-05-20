const db = require("../../models");
const Menu = db.menu;

validaCamposRequeridosMenu = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.nomeMenu) {
        camposRequeridosEmpty.push("nomeMenu");
    }
    if (!req.body.descricaoMenu) {
        camposRequeridosEmpty.push("descricaoMenu");
    }
    if (!req.body.preco) {
        camposRequeridosEmpty.push("preco");
    }
    if (!req.body.produto) {
        camposRequeridosEmpty.push("produto");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Menu
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomeMenu) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosMenu(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Menu
    const menu = new Menu({
        nomeMenu: req.body.nomeMenu ? req.body.nomeMenu : null,
        descricaoMenu: req.body.descricaoMenu ? req.body.descricaoMenu : null,
        preco: req.body.preco ? req.body.preco : null,
        produto: req.body.produto ? req.body.produto.id : null
    });

    // Save Menu in the database
    menu
        .save(menu)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Menu."
            });
        });
};

// Procura por todas as entidades do tipo Menu
exports.findAll = (req, res) => {
    var condition = {};

    Menu.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Menu."
        });
      });
};

// Busca a entidade Menu por id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    Menu.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Menu com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Menu com o id " + id + "."
        });
      });
};

// Altera uma entidade Menu
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosMenu(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Menu.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Menu com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Menu com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Menu com o id " + id + "."
        });
      });
};

// Remove a entidade Menu por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Menu.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Menu com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Menu com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Menu com o id " + id + "."
        });
      });
};

// Exclui todos os registros da entidade Menu
exports.deleteAll = (req, res) => {

    Menu.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} ${data.deletedCount > 1 ? '' : 'Menu'}  foram excluídas!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao excluir todas as entidades Menu."
        });
      });
};

exports.findCustom = (req, res) => { 
  findCustom(req, res, Orders); 
};
