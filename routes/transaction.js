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
    // TODO use session in production
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
    console.log(req.body);
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
      if (item.type === "expense") {
        balance -= amount;
      } else {
        balance += amount;
      }
    });
    const user_collection = await getCollection("Users");
    await user_collection.updateOne(
      { _id: ObjectId(req.cookies._id) },
      { $set: { balance: parseFloat(balance.toFixed(2)) } }
    );
    console.log("fin", balance.toFixed(2));
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

// update income value
router.get("/test", async (req, res) => {
  try {
    const collection = await getCollection("Transactions");
    const cursor = await collection
      .find({ user_id: req.cookies._id, type: "income" })
      .sort({ date: -1 });
    await cursor.forEach((item) => {
      const _id = item._id;
      const amount = parseFloat(item.amount);
      collection.updateOne(
        { _id: ObjectId(_id) },
        { $set: { amount: amount } }
      );
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

module.exports = router;
