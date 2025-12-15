import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hola Mundo v2 🫡");
});

export default app;
