const express = require("express");
const app = express();
const port = 8080;

// Middleware for parsing POST form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET route
app.get("/register", (req, res) => {
    const { user, password } = req.query; // works for GET
    res.send(`GET: Welcome ${user}!`);
});

// POST route
app.post("/register", (req, res) => {
    const { user, password } = req.body; // ✅ use body here
    res.send(`POST: Welcome ${user}!`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

