class IRepository {
  async create(item) {
    throw new Error('Method not implemented.');
  }

  async findById(id) {
    throw new Error('Method not implemented.');
  }

  async find(query) {
    throw new Error('Method not implemented.');
  }

  async update(id, item) {
    throw new Error('Method not implemented.');
  }

  async delete(id) {
    throw new Error('Method not implemented.');
  }
}

module.exports = IRepository;
