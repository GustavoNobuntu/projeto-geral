const IRepository = require('./irepository');
const Firebird = require('node-firebird');

const options = {
    host: 'localhost',
    port: 3050,
    database: 'path/to/database.fdb',
    user: 'SYSDBA',
    password: 'masterkey',
};

class FirebirdRepository extends IRepository {
    constructor() {
        super();
        this.pool = new Firebird.pool(5, options);
    }

    async create(data) {
        return new Promise((resolve, reject) => {
            this.pool.get((err, db) => {
                if (err) reject(err);
                const sql = 'INSERT INTO table_name (columns) VALUES (values)';
                db.query(sql, (err, result) => {
                    db.detach();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });
    }

    async read(id) {
        return new Promise((resolve, reject) => {
            this.pool.get((err, db) => {
                if (err) reject(err);
                const sql = 'SELECT * FROM table_name WHERE id = ?';
                db.query(sql, [id], (err, result) => {
                    db.detach();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });
    }

    async update(id, data) {
        return new Promise((resolve, reject) => {
            this.pool.get((err, db) => {
                if (err) reject(err);
                const sql = 'UPDATE table_name SET column = value WHERE id = ?';
                db.query(sql, [id, ...Object.values(data)], (err, result) => {
                    db.detach();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            this.pool.get((err, db) => {
                if (err) reject(err);
                const sql = 'DELETE FROM table_name WHERE id = ?';
                db.query(sql, [id], (err, result) => {
                    db.detach();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });
    }

    // Método específico do Firebird
    async customQuery(sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.get((err, db) => {
                if (err) reject(err);
                db.query(sql, params, (err, result) => {
                    db.detach();
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });
    }
}

module.exports = FirebirdRepository;
