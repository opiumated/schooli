const Models = require("../models/model");

let courseController = {};

//GET a course (by Id)
courseController.get = (req, res) => {
  let id = req.params.id;

  Models.Courses.findOne({"_id" : id}).then((course) => {
    return res.status(200).json({
      success: true,
      data: course
    });
  }).catch((err) => {
    return res.status(500).json({
      success: false,
      message: err
    });
  });
};

courseController.getAll = (req, res) => {
  Models.Courses.find({}).then((courses) => {
    return res.status(200).json({
      success: true,
      data: courses
    });
  }).catch((err) => {
    return res.status(500).json({
      success: false,
      message: err
    });
  });
};

//POST add a new course
courseController.post = (req, res) => {
  const {
    code,
    title,
    description,
    teacherId,
    startDate
  } = req.body;

  let course = new Models.Courses({
    code,
    title,
    description,
    teacherId,
    startDate
  });
  
  course.save().then((savedCourse) => {
    Models.Teachers.findByIdAndUpdate(teacherId, { $addToSet: { '_courses': savedCourse._id}}).
    then((existingTeacher) => {
      return res.status(200).json({
        status: true,
        message: "A new course was added"
      })
    }).catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Error adding new course"
      });
    });
  });
};

courseController.update = (req, res) => {

};

courseController.delete = (req, res) => {
  let id = req.params.id;
  Models.Courses.findOne({"_id" : id}, (err, course) => {

    if(err) {
      return res.status(500).json({
        success: false,
        message: "Invalid Course ID"
      });
    }
    course.isDeleted = true;
    course.save((err, deletedCourse) => {
      if(err){
        return res.status(500).json({
          success: false,
          message: `Error removing course with id {$id}`
        });
      }
      return res.status(200).json({
        success: true,
        message : "Course successfully deleted"
      });
    });
  });
};

module.exports = courseController;
