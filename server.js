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

function addEmployees() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter Employee First Name',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter Employee Last Name',
      },
      {
        type: 'input',
        name: 'empRole',
        message: 'Enter Employee Role ID',
      },
      {
        type: 'input',
        name: 'empManager',
        message: 'Enter Employee Manager ID',
      },
    ])
    .then(function (response) {
      db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [
          response.firstName,
          response.lastName,
          response.empRole,
          response.empManager,
        ],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

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
        message: 'Enter Department ID#',
      },
    ])
    .then((response) => {
      db.query(
        'INSERT INTO roles (role_name, salary, department_id) VALUES (?, ?, ?)',
        [response.new_role, response.new_salary, response.new_dept_id],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

init();
