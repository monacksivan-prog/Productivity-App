const express = require("express");
const cors = require("cors");
const parseInput = require("./services/parser");

const app = express();

app.use(cors());
app.use(express.json());

let entries = [];

// Add
app.post("/api/entries", (req, res) => {
  const parsed = parseInput(req.body.text);
  const newEntry = { id: Date.now(), ...parsed };
  entries.unshift(newEntry);
  res.json(newEntry);
});

// Get
app.get("/api/entries", (req, res) => {
  res.json(entries);
});

// Delete
app.delete("/api/entries/:id", (req, res) => {
  const id = Number(req.params.id);
  entries = entries.filter((e) => e.id !== id);
  res.json({ message: "Deleted" });
});

// Update
app.put("/api/entries/:id", (req, res) => {
  const id = Number(req.params.id);
  const parsed = parseInput(req.body.text);

  let updatedEntry = null;

  entries = entries.map((e) => {
    if (e.id === id) {
      updatedEntry = { ...e, ...parsed };
      return updatedEntry;
    }
    return e;
  });

  res.json(updatedEntry); // ✅ return updated object
});

app.listen(5000, () => console.log("Server running"));