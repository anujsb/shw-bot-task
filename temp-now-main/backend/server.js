const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");
const agentRoutes = require("./routes/agentRoutes");
const cannedMessageRoutes = require("./routes/cannedMessageRoutes");

connectDB();
const app = express();

// Enable CORS for requests from localhost:3000
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only frontend running on localhost:3000
    methods: "GET,POST,PUT,DELETE", // Specify allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

app.use(express.json());

app.use("/api/messages", messageRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/canned/messages", cannedMessageRoutes);

const PORT = 3000; // Update the backend server port to 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
