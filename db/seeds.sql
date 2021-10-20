USE employees_db;

INSERT INTO department (id, dept_name)
VALUES (1, "Finance"), 
       (2, "Sales"), 
       (3, "Customer Service"),
       (4, "Legal");

INSERT INTO roles (id, role_name, salary, department_id)
VALUES (1, "Manager", 500.00, 2), 
       (2, "Engineer", 700.00, 2), 
       (3, "Accountant", 500.00, 3), 
       (4, "CEO", 700.00, 3), 
       (5, "Salesman", 500.00, 1), 
       (6, "Financial Advisor", 700.00, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Smith", 2, 0), 
       (2, "Noah", "Gundersen", 5, 1), 
       (3, "Tyler", "Childers", 4, 0), 
       (4, "Ethel", "Kennedy", 4, 3), 
       (5, "Walter", "Dubois", 3, 3), 
       (6, "Madelyn", "Johnson", 2, 0);