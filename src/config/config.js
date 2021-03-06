require('dotenv/config');

module.exports = {
    development: {
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASWORD,
        host: process.env.DB_HOST,
        dialect: "mysql",
    },
    production: {
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres"
    }
}