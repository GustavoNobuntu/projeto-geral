var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        transactionType: {type: Schema.Types.ObjectId, ref: 'inventoryTransactionTypes'}, 
      transactionCreatedDate: Date,
      transactionModifiedDate: Date,
        product: {type: Schema.Types.ObjectId, ref: 'products'}, 
      quantity: Number,
        purchaseOrder: {type: Schema.Types.ObjectId, ref: 'purchaseOrders'}, 
        customerOrder: {type: Schema.Types.ObjectId, ref: 'orders'}, 
      comments: String
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

  const InventoryTransactions = mongoose.model("inventoryTransactions", schema);
  return InventoryTransactions;
};
