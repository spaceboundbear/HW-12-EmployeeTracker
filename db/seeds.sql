USE employees_db;

INSERT INTO department (id, dept_name)
VALUES (1, "Finance"), 
       (2, "Sales"), 
       (3, "Developer"),
       (4, "Legal"),
       (5, "Executive");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Manager", 500.00, 5), 
       (2, "Engineer", 700.00, 3), 
       (3, "Accountant", 500.00, 1), 
       (4, "CEO", 700.00, 5), 
       (5, "Salesman", 500.00, 2), 
       (6, "Financial Advisor", 700.00, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Smith", 1, 4), 
       (2, "Noah", "Gundersen", 2, 4), 
       (3, "Tyler", "Childers", 3, 6), 
       (4, "Ethel", "Kennedy", 4, 0), 
       (5, "Walter", "Dubois", 5, 0), 
       (6, "Madelyn", "Johnson", 6, 4);