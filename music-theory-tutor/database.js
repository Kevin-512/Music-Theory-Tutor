//ref https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const source = "db.sqlite";

let db = new sqlite3.Database(source, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
        } else {
          // Test Data
          var insert =
            "INSERT INTO user (name, email, password) VALUES (?,?,?)";
          db.run(insert, ["admin", "admin@example.com", md5("admintest")]);
          db.run(insert, ["user", "user@example.com", md5("usertest")]);
        }
      }
    );
    db.run(
      `CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userID integer, 
            quizType text, 
            keySig text,
            score integer,
            time integer
            )`,
      (err) => {
        if (err) {
        } else {
          // Test Data
          var insert =
            "INSERT INTO results (userID, quizType, keySig, score, time) VALUES (?,?,?,?,?)";
          db.run(insert, ["1", "Scales", "C", "5"]);
          db.run(insert, ["1", "Notereading", "D", "12", "30"]);
          db.run(insert, ["2", "Scale", "A", "2"]);
        }
      }
    );
  }
});

module.exports = db;
