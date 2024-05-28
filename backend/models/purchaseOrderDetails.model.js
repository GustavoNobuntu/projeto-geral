var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        purchaseOrder: {type: Schema.Types.ObjectId, ref: 'purchaseOrders'}, 
        product: {type: Schema.Types.ObjectId, ref: 'products'}, 
      quantity: Number,
      unitCost: Number,
      dateReceived: Date,
      postedToInventory: Boolean,
        inventory: {type: Schema.Types.ObjectId, ref: 'inventoryTransactions'}, 
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

  const PurchaseOrderDetails = mongoose.model("purchaseOrderDetails", schema);
  return PurchaseOrderDetails;
};
