module.exports = app => {
    const menu = require("../app/controllers/menu.controller.js"); 
    const checkIfDateIsOlder = require("../app/middlewares/checkIfDateIsOlder.middleware.js"); 

    const db = require("../models/index.js"); 
    const Menu = db.menu; 

    var router = require("express").Router(); 

    // Create a new Menu 
    router.post("/", menu.create); 
    // Retrieve all menu 
    router.get("/", menu.findAll); 
    // Retrieve a single Menu with id 
    router.get("/:id", menu.findOne); 
    // Update a Menu with id 
    router.put("/:id", checkIfDateIsOlder(Menu), menu.update); 
    // Delete a Menu with id 
    router.delete("/:id", menu.delete); 
    // Create a new Menu 
    router.delete("/", menu.deleteAll); 
    app.use('/api/menu', router); 
  }; 
