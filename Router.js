var express = require("express");
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// Define your MongoDB connection URL and database name
const mongoURL = 'mongodb://localhost:27017'; // Replace with your MongoDB URL
const database = 'Ecom'; // Replace with your database name

router.post('/login', async (req, res) => {
    try {
        const email = req.body.Email;
        const password = req.body.Password;

        // Connect to the MongoDB database
        const client = await MongoClient.connect(mongoURL, { useNewUrlParser: true });
        const db = client.db(database);
        const collection = db.collection("collection.Credentials");

        // Find a user with the provided email
        const response = await collection.findOne({ Email: email });
        if (response && response.Email === email && response.Password === password) {
            const authOk = true;
            if (response.RoleID === 3 && authOk == true) {
                res.status(201).render("Index");
            } else {
                res.status(201).send("Admin");
            }
        } else {
            res.send("Invalid");
        }

        // Close the MongoDB connection
        client.close();
    } catch (error) {
        console.error(error);
        res.status(404).send("Invalid Credentials");
    }
});

router.post('/register', async (req, res) => {
    try {
        const email = req.body.Email;

        // Connect to the MongoDB database
        const client = await MongoClient.connect(mongoURL, { useNewUrlParser: true });
        const db = client.db(database);
        const collection = db.collection("collection.Credentials");

        // Check if the user already exists with the given email
        const existingUser = await collection.findOne({ Email: email });

        if (existingUser) {
            res.redirect("/login?message=User already exists with this Email");
        } else {
            const email = req.body.Email;
            const rolename = req.body.RoleName;
            const password = req.body.Password;

            // Insert the new user into the database
            const data = await collection.insertOne({ RoleID: 3, Role_Name: rolename, Email: email, Password: password, UserID: 3 });
            console.log(data);
            res.status(200).render('login');
        }

        // Close the MongoDB connection
        client.close();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
