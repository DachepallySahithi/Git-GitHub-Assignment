const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const uri = "mongodb://dachepallysahithi_db_user:Sahithi123@ac-7ok0uif-shard-00-00.l30kddq.mongodb.net:27017,ac-7ok0uif-shard-00-01.l30kddq.mongodb.net:27017,ac-7ok0uif-shard-00-02.l30kddq.mongodb.net:27017/?ssl=true&replicaSet=atlas-13xj5x-shard-0&authSource=admin&appName=Cluster0";
const client = new MongoClient(uri);
app.post('/submit', async (req, res) => {

    try {
        await client.connect();
        const db = client.db("studentDB");
        const collection =
            db.collection("students");

        await collection.insertOne({
            name: req.body.name,
            email: req.body.email
        });

        res.redirect('/success.html');
    }
    catch(error) {
        console.log("FULL ERROR:");
        console.log(error);
        res.send(`
            <h2>Error Occurred</h2>
            <p>${error.message}</p>
            <a href="/">Go Back</a>
        `);

    }
});
app.listen(3000, () => {
    console.log(
        "Server running at http://localhost:3000"
    );
});