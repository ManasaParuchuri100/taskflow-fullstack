const express = require("express");

const validateTask =
    require("../middleware/validateTask");

const router = express.Router();

const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

router.get("/", getTasks);

router.post(
    "/",
    validateTask,
    createTask
);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;