const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

// Inițializare Supabase
const supabase = createClient(
  "https://ocughtkphnvggfzkamtb.supabase.co", // URL-ul tău Supabase
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdWdodGtwaG52Z2dmemthbXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNDUwMTksImV4cCI6MjA2MDcyMTAxOX0.CMnn32yjI6xOMnIB2c2KMnp9Xms8Db7lxnIenlydZsY" // Cheia ta de autentificare Supabase
);

const app = express();
app.use(bodyParser.json());

// Modifică IP-ul local al serverului pentru a fi accesibil de pe rețeaua locală
const localIP = "http://192.168.0.206:3000"; // Înlocuiește cu IP-ul tău local obținut din `ipconfig`

// Ruta de bază (pentru a verifica dacă serverul este activ)
app.get("/", (req, res) => {
  res.send(
    "Serverul funcționează! Accesează /pontaj pentru a înregistra pontajul."
  );
});

// Endpoint pentru a înregistra pontajul
app.post("/pontaj", async (req, res) => {
  console.log("Received body:", req.body);
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "UID lipsă!" });
  }

  const { data, error } = await supabase.from("rfid_logs").insert([{ uid }]);

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: error.message });
  }

  res
    .status(200)
    .json({ message: "Pontajul a fost înregistrat cu succes!", data });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Serverul rulează la: http://192.168.0.206:${PORT}`);
});
