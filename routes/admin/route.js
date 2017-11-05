const express = require("express");
const router = express();
const adminController = require("../../controllers/admin/controllers");


function ensureToken(req, res, next) {
    const bearerHolder = req.headers["authorization"];
    if(typeof bearerHolder !==  "undefined") {
        const bearer = bearerHolder.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else {
        res.sendStatus(403);
    }

}


//router.get("/login", adminController.login);
router.post("/login", adminController.login);
//List All Students
router.get("/students", adminController.getStudents);

router.get("/protected", ensureToken, adminController.protected );

//Update a Student Record
/**router.update("/student/:id", adminController.UpdateStudent);

//Delete a Student Record
router.delete("/student/:id", adminController.RemoveStudent);**/



module.exports = router;
