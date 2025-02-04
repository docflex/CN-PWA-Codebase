const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", apiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
