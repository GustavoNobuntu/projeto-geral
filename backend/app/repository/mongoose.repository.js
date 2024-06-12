const IRepository = require('./irepository');

class MongooseRepository extends IRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async create(item) {
    const newItem = new this.model(item);
    return await newItem.save();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async find(query) {
    return await this.model.find(query);
  }

  async update(id, item) {
    return await this.model.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = MongooseRepository;
