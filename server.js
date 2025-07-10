require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Serverul funcționează!");
});

app.post("/pontaj", async (req, res) => {
  const { uid } = req.body;
  if (!uid) return res.status(400).json({ error: "UID lipsă!" });

  const { data, error } = await supabase.from("rfid_logs").insert([{ uid }]);
  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: "Pontaj înregistrat cu succes!", data });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
