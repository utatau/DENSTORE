const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.SUPABASE_DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: console.log,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to Supabase PostgreSQL');
        await sequelize.sync({ alter: true });
        console.log('Database berhasil sinkron');

        return sequelize;
    } catch (error) {
        console.error('gagal konek:', error.message);
        process.exit(1);
    }
};
module.exports = { sequelize, connectDB };