const { check, validationResult } = require('express-validator'); 
const validateCustomers = [ 
    check('company').notEmpty().withMessage('company is required'), 
    (req, res, next) => { 
      const errors = validationResult(req); 
      if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() }); 
      } 
      next(); 
    }, 
  ]; 
  module.exports = validateCustomers; 
