const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'lauren123',
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
  db.query('SELECT * FROM employee', (err, res) => {
    console.table(res);
    init();
  });
}

function vDepartments() {
  db.query('SELECT name FROM department'),
    (err, res) => {
      console.table(res);
      init();
    };
}

function vRoles() {
  db.query('SELECT title FROM roles', (err, res) => {
    console.table(res);
    init();
  });
}

function addEmployees() {
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
}

function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'new_dept',
      message: 'Enter New Department Name',
    })
    .then((res) => {
      const newDept = res.new_dept;
      const query = `INSERT INTO department (d_name) VALUES ('${newDept}')`;
      db.query(query, (err, res) => {
        if (err) {
          throw err;
        }
        console.table(res);
        init();
      });
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
