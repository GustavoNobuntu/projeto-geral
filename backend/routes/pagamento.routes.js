module.exports = app => {
    const pagamento = require("../app/controllers/pagamento.controller.js"); 
    const checkIfDateIsOlder = require("../app/middlewares/checkIfDateIsOlder.middleware.js"); 

    const db = require("../models/index.js"); 
    const Pagamento = db.pagamento; 

    var router = require("express").Router(); 

    // Create a new Pagamento 
    router.post("/", pagamento.create); 
    // Retrieve all pagamento 
    router.get("/", pagamento.findAll); 
    // Retrieve a single Pagamento with id 
    router.get("/:id", pagamento.findOne); 
    // Update a Pagamento with id 
    router.put("/:id", checkIfDateIsOlder(Pagamento), pagamento.update); 
    // Delete a Pagamento with id 
    router.delete("/:id", pagamento.delete); 
    // Create a new Pagamento 
    router.delete("/", pagamento.deleteAll); 
    app.use('/api/pagamento', router); 
  }; 
