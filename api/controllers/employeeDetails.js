const EmployeeDetailsModel = require("../models/employeeDetails");

// to create a new employee detail
exports.create = async (req, res) => {
  if (
    !req.body.firstName &&
    !req.body.lastName &&
    !req.body.email &&
    !req.body.empId
  ) {
    res.status(400).send({ message: "Content cannot be empty!" });
  }
  const employeeDetails = new EmployeeDetailsModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    empId: req.body.empId,
  });

  await employeeDetails
    .save()
    .then((data) => {
      res.send({
        employeeDetails: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
      return
    });
};

// to get all the employee details

exports.fetchAll = async (req, res) => {
    try {
        const employeeDetails = await EmployeeDetailsModel.find();
        res.status(200).json(employeeDetails);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};


// to update an employee detail
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;    
    await EmployeeDetailsModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Employee not found.`
            });
        }else{
            res.send({ message: "Employee details updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// to delete an employee detail
exports.delete = async (req, res) => {
    await EmployeeDetailsModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Employee not found.`
          });
        } else {
          res.send({
            message: "Employee deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};

