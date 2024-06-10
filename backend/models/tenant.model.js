var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = (mongooseConnection) => {
  if (mongooseConnection.models.tenant) {
    return mongooseConnection.models.tenant;
  }

  var schema = mongoose.Schema(
    {
      owner: {
        type: Schema.Types.ObjectId, ref: 'user',
        required: true,
      },
      dbURI: String,
    },
    { timestamps: true }
  );

  schema.set('toJSON', {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

  const Tenant = mongooseConnection.model("tenant", schema);
  return Tenant;
};
