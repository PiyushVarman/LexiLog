import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

// Schema
const wordSchema = new mongoose.Schema({
  word: String,
  definition: String,
  createdAt: { type: Date, default: Date.now },
});

const Word = mongoose.model("Word", wordSchema,"words");

app.get("/word/:word", async (req, res) => {
  const results = await Word.find({
    word: { $regex: new RegExp("^" + req.params.word + "$", "i") }
  });

  if (results.length==0){
    return res.status(404).json({ message: "Not found" });
  } 

  res.json(results);
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running at http://localhost:${process.env.PORT}`);
});
