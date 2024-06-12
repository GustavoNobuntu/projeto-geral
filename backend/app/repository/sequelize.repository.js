const IRepository = require('./irepository');
const { Sequelize, DataTypes } = require('sequelize');

class SequelizeRepository extends IRepository {
  constructor(model) {
    console.log(model);
    super();
    this.model = model;
  }

  async create(item) {
    return await this.model.create(item);
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async find(query) {
    return await this.model.findAll({ where: query });
  }

  async update(id, item) {
    const entity = await this.findById(id);
    if (entity) {
      return await entity.update(item);
    }
    return null;
  }

  async delete(id) {
    const entity = await this.findById(id);
    if (entity) {
      return await entity.destroy();
    }
    return null;
  }
}

module.exports = SequelizeRepository;
