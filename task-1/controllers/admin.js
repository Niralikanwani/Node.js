const Employee = require('../models/employee');
const Department = require('../models/department');

const ITEMS_PER_PAGE = 5;

exports.getEmployees = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalEmployees;
  Employee.find().countDocuments().then(numEmployees => {
    totalEmployee = numEmployees;
    return Employee.find()
    .sort({firstname: 1})
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
  }).then(employees => {
      console.log(employees);
      res.render('admin/employees', {
        emps: employees,
        pageTitle: 'Employees',
        path: '/admin/employees',
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalEmployee,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalEmployee/ITEMS_PER_PAGE)
      });
    })
    .catch(err => console.log(err));
};

exports.getDepartments = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalDepartments;
  Department.find().countDocuments().then(numDepartments => {
    totalDepartment = numDepartments;
    return Department.find()
    .sort({deptname: 1})
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
  }).then(departments => {
      console.log(departments);
      res.render('admin/departments', {
        depts: departments,
        // count: 0,
        pageTitle: 'Departments',
        path: '/admin/departments',
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalDepartment,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalDepartment/ITEMS_PER_PAGE)
      });
    })
    .catch(err => console.log(err));
};

exports.getAddEmployee = (req, res, next) => {
   Department.find()
    .then(departments => {
      res.render('admin/edit-employee', {
        depts: departments,
        pageTitle: 'Add Employee',
        path: '/admin/add-employee',
        editing: false
      });
    })
    .catch(err => console.log(err));
};

exports.getAddDepartment = (req, res, next) => {
  res.render('admin/edit-department', {
    pageTitle: 'Add Department',
    path: '/admin/add-department',
    editing: false
  });
};

exports.postAddEmployee = (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phonenumber = req.body.phonenumber;
  const email = req.body.email;
  const department = req.body.department;
  const employee = new Employee({
    firstname: firstname,
    lastname: lastname,
    phonenumber: phonenumber,
    email: email,
    department:department,
    userId: req.user
  });
  employee
    .save()
    .then(result => {
      // console.log(result);
      console.log('Added Employee');
      res.redirect('/admin/employees');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postAddDepartment = (req, res, next) => {
  const deptname = req.body.deptname;
  const description = req.body.description;  
  const department = new Department({
    deptname: deptname,
    description:description,
    userId: req.user
  });
  department
    .save()
    .then(result => {
      // console.log(result);
      console.log('Added Department');
      res.redirect('/admin/departments');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditEmployee = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const empId = req.params.employeeId;
  Employee.findById(empId)
    .then(employee => {
      if (!employee) {
        return res.redirect('/');
      }
      Department.find()
      .then(departments => {
        res.render('admin/edit-employee', {
          depts: departments,
          pageTitle: 'Edit Employee',
          path: '/admin/edit-employee',
          editing: editMode,
          employee: employee
        });
    })
  }).catch(err => console.log(err));
};

exports.getEditDepartment = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const deptId = req.params.departmentId;
  Department.findById(deptId)
    .then(department => {
      if (!department) {
        return res.redirect('/');
      }
      res.render('admin/edit-department', {
        pageTitle: 'Edit Department',
        path: '/admin/edit-department',
        editing: editMode,
        department: department
      });
    })
    .catch(err => console.log(err));
};

exports.postEditEmployee = (req, res, next) => {
  const empId = req.body.employeeId;
  const updatedfirstname = req.body.firstname;
  const updatedlastname = req.body.lastname;
  const updatedphonenumber = req.body.phonenumber;
  const updatedemail = req.body.email;
  const updateddepartment = req.body.department;

  Employee.findById(empId)
    .then(employee => {
      employee.firstname = updatedfirstname;
      employee.lastname = updatedlastname;
      employee.phonenumber = updatedphonenumber;
      employee.email = updatedemail;
      employee.department = updateddepartment;
      return employee.save();
    })
    .then(result => {
      console.log('UPDATED Employee!');
      res.redirect('/admin/employees');
    })
    .catch(err => console.log(err));
};

exports.postEditDepartment= (req, res, next) => {
  const deptId = req.body.departmentId;
  const updateddeptname = req.body.deptname;
  const updateddescription = req.body.description;

  Department.findById(deptId)
    .then(department => {
      department.deptname = updateddeptname;
      department.description = updateddescription;
      return department.save();
    })
    .then(result => {
      console.log('UPDATED Department!');
      res.redirect('/admin/departments');
    })
    .catch(err => console.log(err));
};

exports.postDeleteEmployee= (req, res, next) => {
  const empId = req.body.employeeId;
  Employee.findByIdAndRemove(empId)
    .then(() => {
      console.log('DESTROYED Employee');
      res.redirect('/admin/employees');
    })
    .catch(err => console.log(err));
};

exports.postDeleteDepartment = (req, res, next) => {
  const deptId = req.body.departmentId;
  Department.findByIdAndRemove(deptId)
    .then(() => {
      console.log('DESTROYED Department');
      res.redirect('/admin/departments');
    })
    .catch(err => console.log(err));
};
