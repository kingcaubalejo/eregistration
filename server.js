const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const xss = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const storage = require("./config/db");

const errorHandler = require("./middleware/error");

// Initiate configuration
dotenv.config({ path: "./config/config.env" });
storage();

// Registration for routes
const health = require("./routes/health");
const user = require("./routes/user");

const app = express();

// Body Parser
app.use(express.json());
//Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Clean xss
app.use(xss());

app.use("/api/v1/health", health);
app.use("/api/v1/user", user);
app.use(errorHandler);

app.use(cors());

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
