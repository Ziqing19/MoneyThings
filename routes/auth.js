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

module.exports = router;
