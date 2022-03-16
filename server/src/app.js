const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("./api/db/mongoose");
const app = express();

const doctorRouter = require("./api/routes/doctorRouter");
const receptionistRouter = require("./api/routes/ReceptionistRouter");
const appointmentModel = require("./api/models/appointmentModel");
const appointmentRouter = require("./api/routes/appointmentRoute");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server Running on port http://localhost:${PORT}`);
});

// **** -----------Middleware------------------- ***********
// register morgan middleware
app.use(morgan("dev"));
// register body parser middleware
app.use(bodyParser.json());
// ************** -----------routing-------------------*****************
app.get("/", (req, res) => {
  res.send("welcome to API!!");
});

// routes
app.use("/doctors", doctorRouter);
app.use("/receptionists", receptionistRouter);
app.use("/appointments", appointmentRouter);
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
