const express = require('express');
const app = express();
const port = 4000;
require("dotenv/config"); // NOTE: this package allows the use of process.env variables
const cors = require('cors');
const path = require("path");
const mongoose = require('mongoose');
const route = require('./src/routes');

// Middleware setup
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));

// Route init
route(app);

// MongoDB Connection
const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pns3c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log("✅ Successfully connected to MongoDB!");
    console.log(`📊 Database: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1); // Exit process if database connection fails
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(process.env.PORT || port, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
