const express = require("express");
const router = express();

//Controller Imports
const studentController = require("../controllers/StudentController");
const teacherController = require("../controllers/TeacherController");
const courseController = require("../controllers/CourseController");

//Student Routes
router.get("/student/:id", studentController.get);
router.get("/students", studentController.getAll);
router.post("/student", studentController.post);
router.get("/student/username/:username", studentController.getByUsername);
router.put("/student/:username", studentController.updateByUsername);
router.delete("/student/:username", studentController.removeByUsername);

//Course Routes
router.get("/course/:id", courseController.get);
router.get("/courses", courseController.getAll);
router.post("/course", courseController.post);
router.delete("/course/:id", courseController.delete);

//Teacher Routes
router.get("/teacher/:id", teacherController.get);
router.get("/teachers", teacherController.getAll);
router.post("/teacher", teacherController.post);
router.delete("/teacher/:id", teacherController.delete);

module.exports = router;
