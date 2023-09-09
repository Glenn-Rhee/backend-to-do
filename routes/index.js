var express = require('express');
var router = express.Router();
const { findUserByUsername, addTaskList, checkedTask, deleteTask } = require("../controller/to-do-list");

// Routes activity
// Tampilkan semua data
router.get('/', async (req, res) => {
  const username = req.query.username;
  const isRegistered = await findUserByUsername(username);
  if (!isRegistered) {
    return res.json({ message: "Undefined username" });
  }

  res.json(isRegistered.taskList);
});

// Menambah data
router.post("/add", async (req, res) => {
  const username = req.query.username;
  const task = req.body.task;
  const date = req.body.date;
  const isRegistered = await findUserByUsername(username);
  if (!isRegistered) {
    return res.json({ message: "Undefined username" });
  }

  const response = await addTaskList(task, isRegistered, date);
  res.json({ message: "Succes add data", response })
});

// Mengedit checked 
router.post("/checked", async (req, res) => {
  const username = req.query.username;
  const id = req.query.id;

  const isRegistered = await findUserByUsername(username);
  if (!isRegistered) {
    return res.json({ message: "Undefined username" });
  }

  const response = await checkedTask(isRegistered, id);

  return res.json({ message: "success", response });
});

// Menghapus task
router.post("/delete", async (req, res) => {
  const username = req.query.username;
  const id = req.query.id;

  const isRegistered = await findUserByUsername(username);
  if (!isRegistered) {
    return res.json({ message: "Undefined username" });
  }

  const response = await deleteTask(isRegistered, id);

  res.json({ message: "Success", response })
})

module.exports = router;
