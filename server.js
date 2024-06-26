const express = require("express");
const app = express();
const connectDB = require("./database/db");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const filterRoutes = require("./routes/filter");
const paymentRoutes = require("./routes/payment");
const path = require("path");

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/filter", filterRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join("client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));
