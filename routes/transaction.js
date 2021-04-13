const express = require("express");
const router = express.Router();

const { ObjectId } = require("mongodb").ObjectID;
const { getCollection } = require("../src/mongo");

const routeUtils = require("../src/routeUtils");

router.use("/", routeUtils.checkLogStatus);

router.get("/all", async (req, res) => {
  try {
    const collection = await getCollection("Transactions");
    const resFind = await collection
      .find()
      .project({ _id: 0, category: 1 })
      .toArray();
    console.log(resFind.length);
    res.send(resFind);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/get-all", async (req, res) => {
  try {
    console.log(req.cookies._id);
    const collection = await getCollection("Transactions");
    const resFind = await collection
      .find({ user_id: req.cookies._id })
      .project({ _id: 0 })
      .toArray();
    console.log(resFind.length);
    res.send(resFind);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/recent", async (req, res) => {
  if (req.body.dateRange === undefined) {
    return res.sendStatus(400);
  }
  try {
    const from = req.body.dateRange[0];
    const to = req.body.dateRange[1];
    const collection = await getCollection("Transactions");
    const resFind = await collection
      .find({
        $and: [
          { user_id: req.cookies._id },
          { date: { $gt: from } },
          { date: { $lt: to } },
        ],
      })
      .sort({ date: -1 })
      .toArray();
    res.send(resFind);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/new", async (req, res) => {
  if (
    req.body.type === undefined ||
    req.body.category === undefined ||
    req.body.merchant === undefined ||
    req.body.amount === undefined ||
    req.body.date === undefined ||
    req.body.remark === undefined
  ) {
    return res.sendStatus(400);
  }
  try {
    req.body.user_id = req.session._id;
    await getCollection("Transactions").insertOne(req.body);
    const user = await getCollection("Users").findOne({
      _id: ObjectId(req.session._id),
    });
    if (user === null) {
      return res.sendStatus(400);
    }
    const new_balance =
      user.balance +
      parseFloat(
        req.body.type === "Income" ? req.body.amount : -req.body.amount
      );
    await getCollection("Users").updateOne(
      { _id: ObjectId(req.session._id) },
      { $set: { balance: new_balance } }
    );
    console.log(req.session);
    req.session.user.balance = new_balance;
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.delete("/delete", async (req, res) => {
  if (req.body._id === undefined) {
    return res.sendStatus(400);
  }
  try {
    const collection = await getCollection("Transactions");
    const transaction = await collection.findOne({
      _id: ObjectId(req.body._id),
    });
    if (transaction === null) {
      return res.sendStatus(400);
    }
    await collection.deleteOne({ _id: ObjectId(req.body._id) });
    const userCollection = await getCollection("Users");
    const user = await userCollection.findOne({
      _id: ObjectId(req.session._id),
    });
    if (user === null) {
      return res.sendStatus(400);
    }
    const new_balance =
      user.balance +
      parseFloat(
        transaction.type === "Income" ? -transaction.amount : transaction.amount
      );
    await userCollection.updateOne(
      { _id: ObjectId(req.session._id) },
      { $set: { balance: new_balance } }
    );
    req.session.user.balance = new_balance;
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/cal-balance", async (req, res) => {
  try {
    const collection = await getCollection("Transactions");
    const cursor = await collection
      .find({ user_id: req.cookies._id })
      .sort({ date: -1 });
    console.log(await cursor.count());
    let balance = 0;
    await cursor.forEach((item) => {
      const amount = item.amount;
      if (item.type === "Expense") {
        balance -= amount;
      } else {
        balance += amount;
      }
    });
    res.send({ balance: balance.toFixed(2) });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

module.exports = router;
