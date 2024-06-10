var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongooseConnection => {

  if (mongooseConnection.models.operation) {
    return mongooseConnection.models.operation;
  }

  var schema = mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId, ref: 'user',
        required: true,
      },
      operationType: {
        type: String,
        required: true,
      },
      tenant: {
        type: Schema.Types.ObjectId, ref: 'tenant',
        required: true,
      },
      ipAddress: {
        type: String,
        required: true,
      },
      geoLocation: {
        type: String
      },
      details: Object
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

  const Operation = mongooseConnection.model("operation", schema);
  return Operation;
};
