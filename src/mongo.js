const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL;

let client, db;

async function connect() {
  try {
    client = new MongoClient(url, { useUnifiedTopology: true });
    console.log("Connecting to the database.");
    await client.connect();
    console.log("Connected.");
    db = client.db("MoneyThings");
  } catch (e) {
    client.close().catch(console.log);
    console.log("Error ", e);
    throw e;
  }
}

function getCollection(collectionName) {
  return db.collection(collectionName);
}

module.exports = {
  connect,
  getCollection,
};
