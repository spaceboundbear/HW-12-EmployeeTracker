const inquirer = require('inquirer');
const mysql = require('mysql2');
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
        'Update Employees',
        'Remove Employees',
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

        case 'Add Employees':
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

        case 'Update Employees':
          updateEmployees();
          break;

        case 'Remove Employees':
          removeEmployees();
          break;

        case 'Quit':
          db.end();
          break;
      }
    });
}

function vEmployees() {
  let query = `SELECT e.id, e.first_name, e.last_name, r.title, d.dept_name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN roles r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`;
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
  let query = `SELECT r.id, r.title, r.salary FROM roles r`;

  db.query(query, function (err, res) {
    if (err) throw err;

    const rChoice = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);

    managerPrompt(rChoice);
  });
}

function managerPrompt(rChoice) {
  let query = `SELECT e.first_name, e.last_name, e.role_id FROM employee e`;

  db.query(query, function (err, res) {
    if (err) throw err;

    const managerChoice = res.map(({ first_name, last_name, role_id }) => ({
      value: role_id,
      first_name: `${first_name}`,
      last_name: `${last_name}`,
    }));

    console.table(res);

    employeesPrompt(rChoice, managerChoice);
  });
}

function employeesPrompt(rChoice, managerChoice) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'empFirstName',
        message: 'Enter Employee First Name',
      },
      {
        type: 'input',
        name: 'empLastName',
        message: 'Enter Employee Last Name',
      },
      {
        type: 'list',
        name: 'empRole',
        message: 'Enter Employee Role',
        choices: rChoice,
      },
      {
        type: 'list',
        name: 'empManager',
        message: 'Enter Employee Manager',
        choices: managerChoice,
      },
    ])
    .then(function (response) {
      db.query(
        'INSERT INTO employee SET ?',
        {
          first_name: response.empFirstName,
          last_name: response.empLastName,
          role_id: response.empRole,
          manager_id: response.empManager,
        },
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
  let query = `SELECT d.id, d.dept_name, r.salary AS budget
    FROM employee e
    JOIN roles r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.dept_name`;

  db.query(query, function (err, res) {
    if (err) throw err;

    const dChoice = res.map(({ id, dept_name }) => ({
      value: id,
      name: `${id} ${dept_name}`,
    }));

    console.table(res);
    rolePrompt(dChoice);
  });
}

function rolePrompt(dChoice) {
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
        type: 'list',
        name: 'new_dept_id',
        message: 'Choose Department',
        choices: dChoice,
      },
    ])
    .then((response) => {
      db.query(
        'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
        [response.new_role, response.new_salary, response.new_dept_id],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

function updateEmployees() {
  let query = `Select e.id, e.first_name, e.last_name FROM employee e`;
  db.query(query, function (err, res) {
    if (err) throw err;

    const update = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    }));
    console.table(res);
    updateRole(update);
  });
}

function updateRole(update) {
  let query = `SELECT r.id, r.title, r.salary FROM roles r`;
  db.query(query, function (err, res) {
    if (err) throw err;

    let roleUpdate = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);

    updateEmp(update, roleUpdate);
  });
}

function updateEmp(update, roleUpdate) {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Which Employee Would You Like to Update?',
        name: 'empUpdate',
        choices: update,
      },
      {
        type: 'list',
        message: 'Choose New Employee Role',
        name: 'empRoleUpdate',
        choices: roleUpdate,
      },
    ])
    .then(function (response) {
      db.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [response.empRoleUpdate, response.empUpdate],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

function removeEmployees() {
  let query = `Select e.id, e.first_name, e.last_name FROM employee e`;
  db.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmp = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));
    console.table(res);
    delEmp(deleteEmp);
  });
}

function delEmp(deleteEmp) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'empID',
        message: 'Select Employee To Remove',
        choices: deleteEmp,
      },
    ])
    .then(function (response) {
      let query = `DELETE FROM employee WHERE ?`;
      db.query(query, { id: response.empID }, function (err, res) {
        if (err) throw err;

        console.table(res);
        init();
      });
    });
}

init();
