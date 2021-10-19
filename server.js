const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_Password,
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
        'Delete Roles',
        'Delete Departments',
        'Remove Employees',
        'Quit',
      ],
    })
    .then((response) => {
      switch (response.choices) {
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

        case 'Quit':
          endSession();
          break;
      }
    });
}

function vEmployees() {
  db.query('SELECT * FROM employee', function (err, res) {
    console.table(res);
    init();
  });
}

function vDepartments() {
  db.query('SELECT name FROM department'),
    function (err, res) {
      console.table(res);
      init();
    };
}

function vRoles() {
  db.query('SELECT title FROM roles', function (err, res) {
    console.table(res);
    init();
  });
}

function addEmployees() {
  inquirer.prompt([
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
  ]);
}
