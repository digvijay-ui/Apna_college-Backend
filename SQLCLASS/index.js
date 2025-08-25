const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'digu@5824',
    database: 'delta_app',
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) AS count FROM user`;
    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Some error in DB");
        }
        let count = result[0].count;
        res.render("home", { count });
    });
});

app.get("/user", (req, res) => {
    let q = `SELECT * FROM user`;  // ✅ Fixed SQL
    connection.query(q, (err, users) => {
        if (err) {
            console.log(err);
            return res.send("Some error in DB");
        }
        res.render("showuser", { users });  // ✅ No .ejs needed
    });
});
app.get("/user/:id/edit", (req, res) => {
    const { id } = req.params;
    const q = `SELECT * FROM user WHERE id = ?`;
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error loading user");
        }
        const user = result[0];
        res.render("edit", { user }); // not `{ejs}`
    });
});


app.patch("/user/:id", (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    const q = `UPDATE user SET username = ? WHERE id = ? AND password = ?`;

    connection.query(q, [username, id, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error updating user.");
        }
        res.redirect("/user");
    });
});



app.listen(8080, () => {
    console.log("✅ Server is listening on port 8080");
});

