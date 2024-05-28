var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        employee: {type: Schema.Types.ObjectId, ref: 'employees'}, 
        customer: {type: Schema.Types.ObjectId, ref: 'customers'}, 
      orderDate: Date,
      shippedDate: Date,
        shipper: {type: Schema.Types.ObjectId, ref: 'shippers'}, 
      shipName: String,
      shipAddress: String,
      shipCity: String,
      shipStateProvince: String,
      shipZipPostalCode: String,
      shipCountryRegion: String,
      shippingFee: Number,
      taxes: Number,
      paymentType: String,
      paidDate: Date,
      notes: String,
      taxRate: Number,
        taxStatus: {type: Schema.Types.ObjectId, ref: 'ordersTaxStatus'}, 
        status: {type: Schema.Types.ObjectId, ref: 'ordersStatus'}, 
        orderDetails: {type: Schema.Types.ObjectId, ref: 'orderDetails'}, 
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

  const Orders = mongoose.model("orders", schema);
  return Orders;
};
