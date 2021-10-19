INSERT INTO department (f_name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO roles (department_id, salary, title)
VALUES (1, 100000000, 'Lead Engineer'),
       (2, 200000000, 'Head of Finance'),
       (3, 300000000, 'Head of Legal'),
       (4, 400000000, 'Head of Sales');

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Lil', 'Wayne', 1, 10),
       ('Marshall', 'Mathers', 2, 20),
       ('Nicki', 'Minaj', 3, 30),
       ('Jimmy', 'McGill', 4, 40)
