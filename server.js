const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const AuditLog = require("./models/auditLog");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    watchUserCollection();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Watch user collection for changes
async function watchUserCollection() {
  const dbConnection = mongoose.connection;
  const collections = ["users", "budgets", "ngoprofiles"];

  for (const collectionName of collections) {
    try {
      // Enable pre-and-post image tracking if not already enabled
      await dbConnection.db.command({
        collMod: collectionName,
        changeStreamPreAndPostImages: { enabled: true },
      });
    } catch (error) {
      console.warn(
        `Error enabling pre-and-post images for ${collectionName}:`,
        error.message
      );
    }

    const collection = dbConnection.collection(collectionName);
    const changeStream = collection.watch([], {
      fullDocument: "updateLookup",
      fullDocumentBeforeChange: "required",
    });

    changeStream.on("change", async (change) => {
      const auditLog = new AuditLog({
        operationType: change.operationType,
        collection: change.ns.coll,
        documentKey: change.documentKey,
        fullDocument: change.fullDocument,
        fullDocumentBeforeChange: change.fullDocumentBeforeChange,
      });

      try {
        await auditLog.save();
        console.log(`Audit log saved for operation: ${change.operationType}`);
      } catch (error) {
        console.error("Failed to save audit log:", error.message);
      }
    });
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
