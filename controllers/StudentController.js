const Models = require("../models/model");

const studentController = {};

//GET a Student by username(default)
studentController.get = (req, res) => {
  //Get the student objectId from the request param
  //Find a student with that objectId and output a json of the students data
  let username = req.params.username;
  console.log(username);
  Models.Students.findOne({"username" : username}, (err, student) => {
    console.dir(student);
    if(err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }
    return res.status(200).json({
      success: true,
      data: student
    });
  });
}

//GEt a Student by their username
studentController.getByUsername = (req, res) => {
  let username = req.params.username;
  Models.Students.findOne({"username" : username}, (err, student) => {
    if(err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }
    return res.status(200).json({
      success: true,
      data: student
    });
  });

}

//GET all the students in the database
studentController.getAll = (req, res) => {
  Models.Students.find({isDeleted: false}).then((students) => {
    return res.status(200).json({
      success: true,
      data: students
    }).catch((err) => {
      return res.status(500).json({
        success: false,
        message: err
      });
    });
  });
}

//POST Creates/Registers a new student in the database
studentController.post = (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    avatar_url,
    email,
    username,
    nationality,
    gender
  } = req.body;

  const student = new Models.Students({
    firstName,
    middleName,
    lastName,
    avatar_url,
    email,
    username,
    nationality,
    gender
  });
  student.save().then((newStudent) => {
    return res.status(200).json({
      success: true,
      data: newStudent
    });
  }).catch((err) => {
    return res.status(500).json({
      success: false,
      message: err
    });
  });
}

//PUT Updates a student in the database
studentController.updateByUsername = (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    nationality,
    gender
  } = req.body;

  let newStudent = {
    firstName,
    lastName,
    middleName,
    email,
    username: req.params.username,
    nationality,
    gender,
    updatedAt: Date.now()
  };

  Models.Students.findOneAndUpdate({username: req.params.username}, newStudent, (err, student) => {
    if(err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }
    if(student){
      return res.status(200).json({
        success: true,
        data: student
      });
    }
  });
};

//DELETE Remove a student by their _id
studentController.remove = (req, res) => {
  Models.Students.findByIdAndRemove(req.params.id, (err, student) => {
    if(err){
      return res.status(500).json({
          success: false,
          message: "Invalid Student ID"
      });
    }
    return res.status(200).json({
      success: true,
      message: `Student with id: ${student._id} successfully removed`
    });
  });
}

//DELETE Remove a student by their username
studentController.removeByUsername = (req, res) => {
    Models.Students.findOne({username: req.params.username}, (err, student) => {
      if(err) {
        return res.status(500).json({
          success: false,
          message: "Invalid Username"
        });
      }
      student.isDeleted = true;
      student.save((err, deletedStudent) => {
        if(err){
          res.status(500).json({
            success: false,
            message: "Error Deleting student"
          });
        }
        return res.status(200).json({
          success: true,
          message : "Student successfully deleted"
        });
      });
    });
}

module.exports = studentController;
