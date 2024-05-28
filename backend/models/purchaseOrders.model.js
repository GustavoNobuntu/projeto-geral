var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        supplier: {type: Schema.Types.ObjectId, ref: 'suppliers'}, 
        createdBy: {type: Schema.Types.ObjectId, ref: 'employees'}, 
      submittedDate: Date,
      creationDate: Date,
        status: {type: Schema.Types.ObjectId, ref: 'purchaseOrderStatus'}, 
      expectedDate: Date,
      shippingFee: Number,
      taxes: Number,
      paymentDate: Date,
      paymentAmount: Number,
      paymentMethod: String,
      notes: String,
      approvedBy: Number,
      approvedDate: Date,
      submittedBy: Number,
        purchaseOrderDetails: {type: Schema.Types.ObjectId, ref: 'purchaseOrderDetails'}, 
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

  const PurchaseOrders = mongoose.model("purchaseOrders", schema);
  return PurchaseOrders;
};
