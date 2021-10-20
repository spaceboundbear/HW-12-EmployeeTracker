const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'employees_db',
  },
  console.log('Connected to Employees Database')
);

function init() {
  inquirer
    .prompt({
      name: 'choices',
      message: 'Welcome To The Employee Database || Please Choose Action',
      type: 'list',
      choices: [
        'View Employees',
        'Add Employees',
        'View Departments',
        'Add Department',
        'View Roles',
        'Add Role',
        'Quit',
      ],
    })
    .then((res) => {
      switch (res.choices) {
        case 'View Employees':
          vEmployees();
          break;

        case 'Add Employeees':
          addEmployees();
          break;

        case 'View Departments':
          vDepartments();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'View Roles':
          vRoles();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Remove Employees':
          removeEmployees();
          break;

        case 'Delete Departments':
          deleteDepartments();
          break;

        case 'Delete Roles':
          deleteRoles();
          break;
      }
    });
}

function vEmployees() {
  let query = 'SELECT * FROM employee';
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function vDepartments() {
  let query = 'SELECT * FROM department';
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function vRoles() {
  let query = 'SELECT * FROM roles';
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}

addEmployees = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter Employee First Name',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter Employee Last Name',
      },
      {
        type: 'input',
        name: 'emp_role',
        message: 'Enter Employee Role ID',
      },
      {
        type: 'input',
        name: 'emp_manager',
        message: 'Enter Employee Manager ID',
      },
    ])
    .then((res) => {
      const firstName = res.first_name;
      const lastName = res.last_name;
      const empRole = res.emp_role;
      const empManager = res.emp_manager;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${empRole}', '${empManager}')`;
      db.query(query, (err, res) => {
        if (err) {
          throw err;
        }
        console.table(res);
        init();
      });
    });
};

function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      message: 'What is the name of the department?',
      name: 'deptName',
    })
    .then(function (answer) {
      db.query(
        'INSERT INTO department (dept_name) VALUES (?)',
        [answer.deptName],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'new_role',
        message: 'Enter New Role Title',
      },
      {
        type: 'int',
        name: 'new_salary',
        message: 'Enter Role Salary',
      },
      {
        type: 'input',
        name: 'new_dept_id',
        message: 'Enter Department ID',
      },
    ])
    .then((res) => {
      const newRole = res.new_role;
      const newSalary = res.new_salary;
      const newDeptID = res.new_dept_id;
      const query = `INSERT INTO role (title, salary, department_id) VALUES ('${newRole}', '${newSalary}', '${newDeptID}')`;
      db.query(query, (err, res) => {
        if (err) {
          throw err;
        }
        console.table(res);
        init();
      });
    });
}

init();
