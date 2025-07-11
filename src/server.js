const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let tasks = [];
let id = 1;

app.get("/tasks", (req, res) => res.json(tasks));

app.post("/tasks", (req, res) => {
  const { title, priority, description } = req.body;
  const task = { id: id++, title, priority, description };
  tasks.push(task);
  res.status(201).json(task);
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).end();
});

// Exporta o app para testes
module.exports = app;

// Executa o servidor apenas se este arquivo for executado diretamente
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
}
