var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        order: {type: Schema.Types.ObjectId, ref: 'orders'}, 
        product: {type: Schema.Types.ObjectId, ref: 'products'}, 
      quantity: Number,
      unitPrice: Number,
      discount: Number,
        status: {type: Schema.Types.ObjectId, ref: 'orderDetailsStatus'}, 
      dateAllocated: Date,
      purchaseOrderId: Number,
      inventoryId: Number
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

  const OrderDetails = mongoose.model("orderDetails", schema);
  return OrderDetails;
};
