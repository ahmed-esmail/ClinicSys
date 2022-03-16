const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authentication = require("./api/routes/auth.routes");
const payment = require("./api/routes/payment.routes")
require("./api/db/mongoose");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server Running on port http://localhost:${PORT}`);
});

// **** -----------Middleware------------------- ***********
// register morgan middleware
app.use(morgan("dev"));
// register body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// ************** -----------routing-------------------*****************
app.use(authentication);
app.use(payment)
app.get("/", (req, res, next) => {
  res.send("welcome to API!!");
});

//  for unhandled routes
app.use((request, response) => {
  response.send("Their is no page for this route");
});

//************* On Error MiddleWare ************/
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .end(`this is the error : ${JSON.stringify(err.message)}`);
});
