const express = require("express");
const router = express();
const frontendController = require("../../controllers/frontend/controllers");

router.get("/", frontendController.home);
router.post("/student/:username/edit", frontendController.updateAccount);
router.get("/account/edit/:username", frontendController.editAccount);
router.get("/account/student/create", frontendController.createAccount);
router.post("/register/student", frontendController.registerStudent);


module.exports = router;
