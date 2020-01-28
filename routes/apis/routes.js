const express = require("express");
const router = express.Router();
const Student = require("../../models/Student");

router.get("/", (req, res, next) => {
  Student.find()
    .then(studentRecord => {
      res.json(studentRecord);
    })
    .catch(err => console.log(err));
});
//add route
router.post("/addStudent", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const address = req.body.address;
  let newStudent = new Student({
    name: name,
    email: email,
    address: address
  });
  newStudent
    .save()
    .then(studentRecord => {
      res.json(studentRecord);
    })
    .catch(err => console.log(err));
});

// update route

router.put("/updateStudent/:id", (req, res, next) => {
  const id = req.params.id;

  Student.findById(id)
    .then(studentRecord => {
      studentRecord.name = req.body.name;
      studentRecord.email = req.body.email;
      studentRecord.address = req.body.address;
      studentRecord
        .save()
        .then(studentRecord => {
          res.send({
            messgae: "Student Record Update Succesfullly",
            status: "success",
            studentRecord: studentRecord
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
});

//Delete route
router.delete("/deleteStudent/:id", (req, res, next) => {
  const id = req.params.id;

  Student.findById(id)
    .then(studentRecord => {
      studentRecord
        .delete()
        .then(studentRecord => {
          res.send({
            message: "Student Record Deleted Succesfully",
            status: "success",
            studentRecord: studentRecord
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;
