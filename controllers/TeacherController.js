const Models = require("../models/model");

const teacherController = {};

//GET a teacher (default: id)
teacherController.get = (req, res) => {
  Models.Teachers.findOne({_id: req.params.id})
  .then((teacher) => {
    return res.status(200).json({
      success: true,
      data: teacher
    });
  }).catch((err) => {
    return res.status(500).json({
      success: false,
      message: err
    })
  });
}

//GET all the teachers
teacherController.getAll = (req, res) => {
  Models.Teachers.find({}).populate({
    path: '_courses',
    select: 'firstName lastName nationality -_id'
  }).then((teachers) => {
    return res.status(200).json({
      success: true,
      data: teachers
    });
  }).catch((err) => {
    return res.status(500).json({
      success: false,
      message: err
    });
  });
}

//ADD a teacher
teacherController.post = (req, res) => {
  const teacherData = {
    firstName,
    lastName,
    middleName,
    email,
    password,
    nationality
  } = req.body;


  const teacher = new Models.Teachers({
    firstName,
    lastName,
    middleName,
    email,
    password, //: password_hash,
    nationality
  });

  teacher.save().then((tchr) => {
    return res.status(200).json({
      success: true,
      data: tchr
    });
  }).catch((err) => {
    return res.status(200).json({
      success: false,
      message: err
    });
  });
}

//UPDATE a teacher's data
teacherController.update = (req, res) => {

}

//DELETE a teacher
teacherController.delete = (req, res) => {
  Models.Teachers.findOne({_id: req.params.id})
  .then((teacher) => {
    teacher.save((err, delTeacher) => {
      if(err) {
        return res.status(500).json({
          success: false,
          message: err
        });
      }
      return res.status(200).json({
        success: true,
        data: "Teacher has been inactivated"
      });
    });
  }).catch((err) => {
    return res.status(500).json({
      success: false,
      message: "Cannot retrieve teacher with that id"
    });
  });
}

module.exports = teacherController;
