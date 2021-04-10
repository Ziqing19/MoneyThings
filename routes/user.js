const express = require("express");
const router = express.Router();

const { getCollection } = require("../src/mongo");
const { ObjectId } = require("mongodb").ObjectID;

const routeUtils = require("../src/routeUtils");
const bcrypt = require("bcrypt");

router.use("/", routeUtils.checkLogStatus);

router.post("/new-password", async (req, res) => {
  if (req.body.password === undefined) {
    return res.sendStatus(400);
  }
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const collection = await getCollection("Users");
    await collection.updateOne(
      { _id: ObjectId(req.session._id) },
      { $set: { password: hash } }
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error", err);
    }
  });
  res.sendStatus(200);
});

router.get("/get-categories", async (req, res) => {
  try {
    const collection = await getCollection("Users");
    const resFind = await collection.findOne(
      { _id: req.session._id },
      { _id: 0, categories: 1 }
    );
    res.send(resFind);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/update-categories", async (req, res) => {
  if (req.body.categories === undefined) {
    return res.sendStatus(400);
  }
  try {
    const collection = await getCollection("Users");
    const resFind = await collection.updateOne(
      { _id: ObjectId(req.session._id) },
      { $set: { categories: req.body.categories } }
    );
    console.log(resFind);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/update-budget", async (req, res) => {
  if (req.body.budget.amount === 0) {
    return res.sendStatus(400);
  }
  try {
    const collection = await getCollection("Users");
    const resFind = await collection.updateOne(
      { _id: ObjectId(req.session._id) },
      {
        $set: {
          budget: { [req.body.budget.category]: req.body.budget.amount },
        },
      }
    );
    console.log(resFind);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/get-budget", async (req, res) => {
  try {
    const collection = await getCollection("Users");
    const resFind = await collection.findOne(
      { _id: req.session._id },
      { _id: 0, categories: 1 }
    );
    res.send(resFind);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

module.exports = router;
