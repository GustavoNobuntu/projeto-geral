var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        order: {type: Schema.Types.ObjectId, ref: 'orders'}, 
      invoiceDate: Date,
      dueDate: Date,
      tax: Number,
      shipping: Number,
      amountDue: Number
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

  const Invoices = mongoose.model("invoices", schema);
  return Invoices;
};
