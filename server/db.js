const {MongoClient} = require('mongodb');
require("dotenv").config();

let dbConnection;

const username = process.env.USER;
const password = process.env.PASSWORD;

const dbURL = `mongodb+srv://${username}:${password}@inventorymgmtsystem.ihafze5.mongodb.net/`;
console.log(dbURL);

module.exports = {
    connectToDb:(cb) => {
        MongoClient.connect(dbURL, { dbName:"inventory-mgmt-system" })
        .then((client) => {
            dbConnection = client.db("inventory-mgmt-system");
            return cb();
        })
        .catch(err => {
            console.log(err);
            return cb(err);
        })

    },
    getDb: () => dbConnection
}