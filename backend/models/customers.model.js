var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      company: String,
      lastName: String,
      firstName: String,
      emailAddress: String,
      jobTitle: String,
      businessPhone: String,
      homePhone: String,
      mobilePhone: String,
      faxNumber: String,
      address: String,
      city: String,
      stateProvince: String,
      zipPostalCode: String,
      countryRegion: String,
      webPage: String,
      notes: String,
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

  const Customers = mongoose.model("customers", schema);
  return Customers;
};
