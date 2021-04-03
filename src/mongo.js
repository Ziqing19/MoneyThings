const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL || "mongodb://localhost:27017";

let client, db;

function connect() {
  try {
    client = new MongoClient(url, { useUnifiedTopology: true });
    console.log("Connecting to the database.");
    client.connect().then((client) => {
      console.log("Connected.");
      db = client.db("MoneyThings");
    });
  } catch (e) {
    client.close().catch(console.log);
    console.log("Error ", e);
    throw e;
  }
}

function getCollection(collectionName) {
  try {
    return db.collection(collectionName);
  } catch (err) {
    console.log(err);
    setTimeout(void(0), 1000);
    return getCollection(collectionName);
  }
}

module.exports = {
  connect,
  getCollection,
};
