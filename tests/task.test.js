const request = require("supertest");
const app = require("../src/server");

describe("API de Tarefas", () => {
  it("Deve criar uma nova tarefa", async () => {
    const res = await request(app).post("/tasks").send({
      title: "Tarefa Teste",
      description: "Descrição da tarefa de teste",
      priority: "Alta"
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "Tarefa Teste");
    expect(res.body).toHaveProperty("description", "Descrição da tarefa de teste");
  });

  it("Deve retornar uma lista de tarefas", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve deletar uma tarefa existente", async () => {
    const nova = await request(app).post("/tasks").send({
      title: "Para deletar",
      priority: "Média"
    });
    const res = await request(app).delete(`/tasks/${nova.body.id}`);
    expect(res.statusCode).toEqual(204);
  });
});