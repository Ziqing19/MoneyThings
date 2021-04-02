const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.sendStatus(400);
  }
  try {
    console.log("username", req.body.username);
    console.log("password", req.body.password);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  res.sendStatus(200);
});

router.post("/reset", async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
