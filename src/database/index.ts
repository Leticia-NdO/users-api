import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Put the .env constants into the variables to fix undefined type error

const dbName: any = process.env.SEQUELIZE_DATABASE;
const dbUser: any = process.env.SEQUELIZE_USERNAME;
const dbPassword: any = process.env.SEQUELIZE_PASSWORD;
const dbHost: any = process.env.SEQUELIZE_HOST;
const dialect: any = process.env.SEQUELIZE_CONNECTION_DIALECT;

// Connect to the database

const conn = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dialect,
    define: { timestamps: false, underscored: true },
    dialectOptions: {
        // ssl: { require: true, rejectUnauthorized: false },
    },
});

// Check whether the connection with the database was successful or not

conn.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!")
    }).catch(() => {
        console.error("Erro: Falha na conexão com o banco de dados.")
    })

export default conn;