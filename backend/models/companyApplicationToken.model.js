var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        company: {type: Schema.Types.ObjectId, ref: 'company'}, 
        application: {type: Schema.Types.ObjectId, ref: 'application'}, 
      token: String
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

  const CompanyApplicationToken = mongoose.model("companyApplicationToken", schema);
  return CompanyApplicationToken;
};
