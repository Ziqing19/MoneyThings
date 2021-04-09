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

router.post("/update-profile", async (req, res) => {
  if (
    req.body.username === undefined ||
    req.body.avatar === undefined ||
    req.body.biography === undefined
  ) {
    return res.sendStatus(400);
  }
  try {
    const resFind = await getCollection("Users").findOne({
      username: req.body.username,
    });
    console.log(resFind);
    if (resFind !== null) {
      return res.status(400).send("This username has been occupied.");
    }
    const data = {
      username: req.body.username,
      avatar: req.body.avatar,
      biography: req.body.biography,
    };
    await getCollection("Users").updateOne(
      { _id: ObjectId(req.session._id) },
      { $set: data }
    );
    req.session.user = await getCollection("Users").findOne(
      { _id: ObjectId(req.cookies._id) },
      { projection: { _id: 0, password: 0 } }
    );
    req.session.user = undefined;
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/create-category", async (req, res) => {
  if (req.body.type === undefined || req.body.category === undefined) {
    return res.sendStatus(400);
  }
  try {
    if (
      req.session.user.categories[req.body.type].indexOf(req.body.category) > -1
    ) {
      return res.status(400).send("Duplicated category!");
    }
    await getCollection("Users").updateOne(
      { _id: ObjectId(req.session._id) },
      { $push: { [`categories.${req.body.type}`]: req.body.category } }
    );
    req.session.user = undefined;
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.delete("/delete-category", async (req, res) => {
  if (req.body.type === undefined || req.body.category === undefined) {
    return res.sendStatus(400);
  }
  try {
    const resFind = await getCollection("Transactions")
      .find({ category: req.body.category })
      .toArray();
    console.log(resFind);
    if (resFind.length !== 0) {
      return res
        .status(400)
        .send(
          "This category is in use. Please delete all related transactions first."
        );
    }
    await getCollection("Users").updateOne(
      { _id: ObjectId(req.session._id) },
      { $pull: { [`categories.${req.body.type}`]: req.body.category } }
    );
    req.session.user = undefined;
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

module.exports = router;
