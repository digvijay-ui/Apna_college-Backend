const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');

// Middleware
app.use(express.urlencoded({ extended: true }));

// View engine and static files
app.set("view engine", "ejs"); // ✅ Use 'view engine' instead of 'view'
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Sample posts
let posts = [
    {
        id: uuidv4(),
        username: "digvijay",
        content: "I love coding",
    },
    {
        id: uuidv4(),
        username: "urmil",
        content: "Hard work is important to achieve success",
    },
    {
        id: uuidv4(),
        username: "digvijay",
        content: "I got selected for my first internship",
    },
];

// Routes
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts }); // Use 'posts' (plural)
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => { // ✅ FIXED: should be /posts not "post"
    const { username, content } = req.body;
    const newPost = {
        id: Math.random().toString(36).substr(2, 5), // random id
        username,
        content
    };
    posts.push(newPost);
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let{ id } =req.params;
    let newContent =req.body.content;
    console.log(newContent);
    res.send("patch request is working");
});
console.log("Available post IDs:", posts.map(p => p.id));

const port = 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
