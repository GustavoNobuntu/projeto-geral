var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      supplierIds: String,
      productCode: String,
      productName: String,
      description: String,
      standardCost: Number,
      listPrice: Number,
      reorderLevel: Number,
      targetLevel: Number,
      quantityPerUnit: String,
      discontinued: Boolean,
      minimumReorderQuantity: Number,
      category: String,
      attachments: String
    },
    { timestamps: true }
  );

  schema.set("toJSON", {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

  const Products = mongoose.model("products", schema);
  return Products;
};
