const express = require('express');
const PostRouter = require("./posts/postRouter");
const UserRouter = require("./users/userRouter");
const UseMiddleWare = require("./MiddleWare/UseMiddleWare");
const helmet = require('helmet');

const app = express();

app.use(express.json());
app.use(UseMiddleWare.logger);
app.use("/posts", PostRouter);
app.use("users", UserRouter);
app.use(helmet());


app.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = app;
