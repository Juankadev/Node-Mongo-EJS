const dontenv = require('dotenv');
dontenv.config(); // Load environment variables from .env file, if present

const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URL;
const client = new MongoClient(URI);

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Conectado");
        return client;
    }
    catch (error) {
        console.error("Error al conectar");
        return null;
    }
};

const disconnectDB = async () => {
    try {
        await client.close();
        console.log("Desconectado");
    }
    catch (error) {
        console.error("Error al desconectar");
    }
};

module.exports = {connectDB,disconnectDB};

