const express = require("express");

const server = express();

server.use(express.json());

var countReq = 0;

server.use("/", (req, res, next) => {
  countReq = countReq + 1;
  console.log(countReq);

  next();
});

function existsIdInArray(req, res, next) {
  const { id } = req.params;
  const project = projects[id];

  if (!project) {
    return res.status(400).send({ message: `Project Id:${id} not found.` });
  }
  return next();
}

const projects = [
  {
    id: "1",
    title: "Projeto 1",
    tasks: ["Tarefa1", "Tarefa2"]
  }
];

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  projects.push({
    id: id.toString(),
    title: title.toString(),
    tasks: []
  });

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", existsIdInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects[id].title = title;

  return res.json(projects[id]);
});

server.delete("/projects/:id", existsIdInArray, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send({ message: "Deletado com sucsso" });
});

server.post("/projects/:id/tasks", existsIdInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects[id].tasks.push(title);

  return res.send(projects[id]);
});

server.listen(3008);
