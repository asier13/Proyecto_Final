const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./docs/swagger");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("dev"));

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Define routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/commerce", require("./routes/commerce"));
app.use("/api/storage", require("./routes/storage"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});