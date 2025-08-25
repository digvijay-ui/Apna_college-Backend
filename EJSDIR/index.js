const express = require("express");
const path = require("path"); // Import path module
const app = express();

const port = 8080;
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // Correct key: "views"

app.get("/", (req, res) => {
    res.render("home"); // No need to include ".ejs"
});
app.get("/ig/:username",(req,res)  =>{
    let { username } = req.params;
    const instaData = require("./package.json");
    const data = instaData[username];
    if(data){
        res.render("instagram.ejs",{data});
    }else{
        res.render("error.ejes");
    }
});

app.get("/hello", (req, res) => {
    res.send("hello");
});

app.get("/rolldice", (req, res) => {
    res.render("rolldice");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
