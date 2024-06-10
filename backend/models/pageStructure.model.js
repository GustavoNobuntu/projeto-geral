var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongooseConnection => {

  if (mongooseConnection.models.pageStructure) {
    return mongooseConnection.models.pageStructure;
  }

  var schema = mongoose.Schema(
    {
      rolesHasAccess:
        [{ type: Schema.Types.ObjectId, ref: 'role', required: true }],
      className: {
        type: String,
        required: true,
      },
      data: {
        type: Object,
        required: true,
      }
    },
    { timestamps: true }
  );

  schema.index({ className: 1, rolesHasAccess: 1 }, { unique: true });

  // Validação personalizada
  schema.pre('save', async function (next) {
    const pageStructure = this;
    
    try {
      const conflictingPageStructure = await PageStructure.findOne({
        className: pageStructure.className,
        rolesHasAccess: { $in: pageStructure.rolesHasAccess }
      });

      if (conflictingPageStructure && conflictingPageStructure._id.toString() !== pageStructure._id.toString()) {
        const error = new Error('Já existe um PageStructure com este className e compartilhando uma ou mais roles');
        error.status = 409; // Status HTTP 409 Conflict
        return next(error);
      }
      next();
    } catch (err) {
      next(err);
    }
  });

  schema.set('toJSON', {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  });

  const PageStructure = mongooseConnection.model("pageStructure", schema);
  return PageStructure;
};
