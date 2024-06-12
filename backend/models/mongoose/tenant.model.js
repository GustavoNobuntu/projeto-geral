const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId, ref: 'user',
      required: true,
    },
    dbType: {
      type: String,
      required: true,
    },
    dbConfig: String,
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

module.exports = (connection) => connection.model('tenant', schema);
