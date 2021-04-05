const express = require("express");
const router = express.Router();

const { ObjectId } = require("mongodb").ObjectID;
const { getCollection } = require("../src/mongo");
const routeUtils = require("../src/routeUtils");
const bcrypt = require("bcrypt");

router.use("/", (req, res, next) => {
  console.log("Router: user");
  next();
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
      profile_photo: req.session.profile_photo,
    };
    res.send(data);
  }
});

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
    let resFind = await getCollection("Users").find(query).toArray();
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
    const resFind = await getCollection("Users")
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

router.post("/reset", async (req, res) => {
  if (req.body.email === undefined) {
    return res.sendStatus(400);
  }
  try {
    const resFind = getCollection("Users")
      .find({ email: req.body.email })
      .toArray();
    if (resFind.length !== 1) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/new-password", async (req, res) => {
  if (req.body.password === undefined) {
    return res.sendStatus(400);
  }
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await getCollection("Users").updateOne(
      { _id: ObjectId(req.session._id) },
      { $set: { password: hash } }
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/logout", routeUtils.checkLogStatus, async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error", err);
    }
  });
  res.sendStatus(200);
});

router.get("/get-categories", routeUtils.checkLogStatus, async (req, res) => {
  try {
    const resFind = await getCollection("Users").findOne(
      { _id: req.session._id },
      { _id: 0, categories: 1 }
    );
    res.send(resFind);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post(
  "/update-categories",
  routeUtils.checkLogStatus,
  async (req, res) => {
    if (req.body.categories === undefined) {
      return res.sendStatus(400);
    }
    try {
      console.log(req.body.categories);
      await getCollection("Users").updateOne(
        { _id: ObjectId(req.session._id) },
        { $set: { categories: req.body.categories } }
      );
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }
);

module.exports = router;
