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

router.post("/update-profile", async (req, res) => {
  if (
    req.body.username === undefined ||
    req.body.avatar === undefined ||
    req.body.biography === undefined
  ) {
    return res.sendStatus(400);
  }
  try {
    const data = {
      username: req.body.username,
      avatar: req.body.avatar,
      biography: req.body.biography,
    };
    const resUpdate = await getCollection("Users").updateOne(
      { _id: ObjectId(req.session._id) },
      { $set: data }
    );
    console.log(resUpdate);
    req.session.user = await getCollection("Users").findOne(
      { _id: ObjectId(req.cookies._id) },
      { projection: { _id: 0, password: 0 } }
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

module.exports = router;
