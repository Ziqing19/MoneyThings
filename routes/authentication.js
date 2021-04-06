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
        req.session.profile_photo = user.profile_photo;
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
    };
    console.log(data);
    await getCollection("Users").insertOne(data);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

//TODO backend implementation
router.post("/reset", async (req, res) => {
  if (req.body.email === undefined) {
    return res.sendStatus(400);
  }
  try {
    const collection = await getCollection("Users");
    const resFind = await collection.find({ email: req.body.email }).toArray();
    if (resFind.length !== 1) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/get-user", async (req, res) => {
  if (req.session._id === undefined) {
    // once the browser has the cookie, the log status stays valid
    if (req.cookies._id === undefined) {
      return res.sendStatus(204);
    }
    try {
      const collection = await getCollection("Users");
      const resFind = await collection
        .find({
          _id: ObjectId(req.cookies._id),
        })
        .toArray();
      if (resFind.length === 0) {
        res.sendStatus(204);
      } else {
        const user = resFind[0];
        req.session._id = user._id;
        req.session.username = user.username;
        req.session.categories = user.categories;
        req.session.profile_photo = user.profile_photo;
        const data = {
          username: user.username,
          categories: user.categories,
          profile_photo: user.profile_photo,
        };
        res.send(data);
      }
    } catch (err) {
      console.log("Error", err);
      res.sendStatus(400);
    }
  } else {
    const data = {
      username: req.session.username,
      categories: req.session.categories,
      profile_photo: req.session.profile_photo,
    };
    res.send(data);
  }
});

module.exports = router;
