const express = require("express");
const path = require('path');
const { connectDB, disconnectDB } = require("./src/mongodb");
const app = express();
const PORT = process.env.PORT || 3008;

app.set('view engine', 'ejs');
app.use(express.static('views'));

app.get('/', async (req, res) => {
    try {
        const client = await connectDB();
        if (!client) {
            res.status(500).send("Error al conectarse a MongoDB");
            return;
        }
        const db = client.db("frutas");
        const frutas = await db.collection("frutas").find().toArray();
        const data = {
            title: "Mi sitio web",
            message: "Bienvenidos a mi pagina web con un motor",
            frutas: frutas
        };
        res.render('frutas', data);
    }
    catch (error) {
        res.status(500).send("Error al obtener las frutas de la base de datos");
    }
    finally {
        await disconnectDB();
    }
});

app.get('*', (req, res) => {
    const data = {
        title: "Error",
        message: "Algo salio mal",
    };
    res.render('error', data);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});