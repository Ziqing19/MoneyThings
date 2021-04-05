const express = require("express");
const router = express.Router();

const { getCollection } = require("../src/mongo");

router.get("/all", async (req, res) => {
  try {
    const resFind = await getCollection("Transactions")
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
    const resFind = await getCollection("Transactions")
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

router.get("/update", async (req, res) => {
  try {
    const resUpdate = await getCollection("Transactions").updateMany(
      { $or: [{ category: "Shoes" }, { category: "Garden" }] },
      { $set: { category: "Grocery" } }
    );
    console.log(resUpdate.modifiedCount);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
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

module.exports = router;
