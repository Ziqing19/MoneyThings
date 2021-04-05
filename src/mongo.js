const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL;

let client,
  db,
  connected = false;

function connect() {
  try {
    client = new MongoClient(url, { useUnifiedTopology: true });
    console.log("Connecting to the database.");
    client.connect().then((client) => {
      console.log("Connected.");
      connected = true;
      db = client.db("MoneyThings");
    });
  } catch (e) {
    client.close().catch(console.log);
    console.log("Error ", e);
    throw e;
  }
}

function getCollection(collectionName) {
  return new Promise((resolve) => {
    if (connected) {
      resolve(db.collection(collectionName));
    } else {
      setTimeout(() => {
        resolve(db.collection(collectionName));
      }, 5000);
    }
  }).then((res) => res);
}

module.exports = {
  connect,
  getCollection,
};
