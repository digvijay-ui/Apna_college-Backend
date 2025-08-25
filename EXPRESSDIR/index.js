const express = require("express");
const app = express();

const port = 8080;
app.listen(port, () =>{
  console.log(`app is listening on port ${port}`);
});
app.get("/",(req,res)  =>{
  res.send ("hello i am sky!!");
});
app.get("/:username",(req,res)  =>{
  let {username,id} =req.params;
  res.send(`Welecome to the page of @${username}`);
});

