// Ref https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
const express = require("express");
const cors = require("cors");
const app = express();
var db = require("./database.js");
var md5 = require("md5");
var HTTP_PORT = 8000;
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View all users
app.get("/api/users", (req, res, next) => {
  var sql = "select * from user";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (rows) {
      res.json({
        message: "success",
        data: rows,
      });
    } else {
      res.json({
        message: "not_found",
      });
    }
  });
});

// Get user by ID
app.get("/api/users/:id", (req, res, next) => {
  var sql = "select * from user where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({
        message: "success",
        data: row,
      });
    } else {
      res.json({
        message: "not_found",
      });
    }
  });
});

// Register user with email, name and password
app.post("/api/register", (req, res, next) => {
  var errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (!req.body.name) {
    errors.push("No name specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password),
  };
  var sql = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
  var params = [data.name, data.email, data.password];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    var settingsSql =
      "INSERT INTO settings (email, color, textsize) VALUES (?,?,?)";
    var settingsParams = [data.email, "#883bc4", 14];
    db.run(settingsSql, settingsParams, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        id: this.lastID,
      });
    });
  });
});

// Add to results///////////////////////////////
app.post("/api/record/results", (req, res, next) => {
  var data = {
    userID: req.body.userID,
    quizType: req.body.quizType,
    keySig: req.body.keySig,
    score: req.body.score,
    time: req.body.time,
  };
  var sql =
    "INSERT INTO results (userID, quizType, keySig, score, time) VALUES (?,?,?,?,?)";
  var params = [data.userID, data.quizType, data.keySig, data.score, data.time];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});
////////////////////////////////////////////////////////////////////

// Get all results
app.get("/api/results", (req, res, next) => {
  var sql = "select * from results";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (rows) {
      res.json({
        message: "success",
        data: rows,
      });
    } else {
      res.json({
        message: "not_found",
      });
    }
  });
});

// Get result by ID
app.get("/api/results/:id", (req, res, next) => {
  var sql = "select * from results where userID = ?";
  var params = [req.params.id];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (rows) {
      res.json({
        message: "success",
        data: rows,
      });
    } else {
      res.json({
        message: "not_found",
      });
    }
  });
});

// User login
app.post("/api/validate", (req, res) => {
  var errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    email: req.body.email,
    password: md5(req.body.password),
  };
  var sql = "SELECT * FROM user WHERE email = ? AND password = ?";
  var params = [data.email, data.password];
  db.get(sql, params, function (err, row) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({ validation: true, data: row });
    } else {
      res.json({ validation: false });
    }
  });
});

// Get settings by email
app.get("/api/settings/:email", (req, res, next) => {
  var sql = "select * from settings where email = ?";
  var params = [req.params.email];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (rows) {
      res.json({
        message: "success",
        data: rows,
      });
    } else {
      res.json({
        message: "not_found",
      });
    }
  });
});

// Update Colour Theme
app.patch("/api/update/theme/:email", (req, res, next) => {
  var data = {
      color: req.body.color
  }
  db.run(
      `UPDATE settings set 
         color = COALESCE(?,color)
         WHERE email = ?`,
      [data.color, req.params.email],
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({
              message: "success",
              data: data,
              changes: this.changes
          })
  });
})

// Update Font
app.patch("/api/update/font/:email", (req, res, next) => {
  var data = {
      textsize: req.body.textsize
  }
  db.run(
      `UPDATE settings set 
         textsize = COALESCE(?,textsize)
         WHERE email = ?`,
      [data.textsize, req.params.email],
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({
              message: "success",
              data: data,
              changes: this.changes
          })
  });
})

// Update Mode
app.patch("/api/update/mode/:email", (req, res, next) => {
  var data = {
      mode: req.body.mode,
  }
  db.run(
      `UPDATE settings set 
         mode = COALESCE(?,mode)
         WHERE email = ?`,
      [data.mode, req.params.email],
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({
              message: "success",
              data: data,
              changes: this.changes
          })
  });
})

app.listen(HTTP_PORT, () =>
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
);