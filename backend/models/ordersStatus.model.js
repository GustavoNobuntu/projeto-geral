var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      statusName: String
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

  const OrdersStatus = mongoose.model("ordersStatus", schema);
  return OrdersStatus;
};
