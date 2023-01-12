USE employeeDB;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1), ('Sales Rep', 80000, 1), ('Lead Engineer', 150000, 2), ('Software Engineer', 120000, 2), ('Accountant', 125000, 3), ('Legal Team Lead', 250000, 4), ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Vimo', 'Guna', 1, null), ('Thilini', 'Perera', 3, null), ('EJ', 'Indunil', 4, 2), ('Mor', 'jay', 6, null), ('Naijel', 'Krish', 2, 1), ('Kim', 'Meena', 2, 1);