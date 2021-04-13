const express = require("express");
const router = express.Router();

const { getCollection } = require("../src/mongo");
const { ObjectId } = require("mongodb").ObjectID;

const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.sendStatus(400);
  }
  try {
    let query;
    if (req.body.username.indexOf("@") > 0) {
      query = { email: req.body.username };
    } else {
      query = { username: req.body.username };
    }
    const collection = await getCollection("Users");
    const resFind = await collection.find(query).toArray();
    if (resFind.length === 0) {
      return res.sendStatus(404);
    }
    for (let user of resFind) {
      const hash = user.password;
      const match = await bcrypt.compare(req.body.password, hash);
      if (match) {
        req.session._id = user._id;
        req.session.username = user.username;
        req.session.avatar = user.avatar;
        if (req.body.checked) {
          res.cookie("_id", user._id, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
          }); // 1 day
        } else {
          res.cookie("_id", user._id);
        }
        return res.sendStatus(200);
      }
    }
    res.status(404).send("Username and password do not match");
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/signup", async (req, res) => {
  if (req.body.email === undefined || req.body.password === undefined) {
    return res.sendStatus(400);
  }
  try {
    const collection = await getCollection("Users");
    const resFind = await collection
      .find({
        email: req.body.email,
      })
      .toArray();
    if (resFind.length !== 0) {
      return res.status(409).send("This email address has been registered");
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const data = {
      email: req.body.email,
      username: req.body.email.split("@")[0],
      password: hash,
      balance: 0,
      categories: {
        Income: ["Salary", "Transfer", "Stock"],
        Expense: [
          "Grocery",
          "Health",
          "Outdoors",
          "Computers",
          "Sports",
          "Games",
        ],
      },
      budget: {},
      avatar: 0,
      biography: "LifeStyle",
    };
    console.log(data);
    await getCollection("Users").insertOne(data);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/get-user", async (req, res) => {
  if (req.session.user === undefined) {
    // once the browser has the cookie, the log status stays valid
    if (req.cookies._id === undefined) {
      return res.sendStatus(204);
    }
    try {
      const collection = await getCollection("Users");
      const user = await collection.findOne(
        { _id: ObjectId(req.cookies._id) },
        { projection: { _id: 0, password: 0 } }
      );
      if (user === null) {
        res.sendStatus(204);
      } else {
        req.session._id = req.cookies._id;
        req.session.user = user;
        res.send(user);
      }
    } catch (err) {
      console.log("Error", err);
      res.sendStatus(400);
    }
  } else {
    res.send(req.session.user);
  }
});

module.exports = router;
