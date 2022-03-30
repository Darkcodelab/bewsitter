require("dotenv").config();
const { PORT, MONGO_URI } = process.env;

const express = require("express");
const app = express();

// Database connection
const connectDB = require("./config/db");
connectDB(MONGO_URI);

// Error handler function
const errorHandler = require("./middlewares/errorHandler");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth/login", require("./routes/auth/login"));
app.use("/auth/register", require("./routes/auth/register"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
