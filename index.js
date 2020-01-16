// code away!
const express = require("express");
const server = require("./server");

server.use(express.json());

server.get("/", (req,res) => {
    res.send({api: "its working"});
})

 const port = 5000;

 server.listen(port, () => {
     console.log(`My child, your api is running on port ${port}`)
 });