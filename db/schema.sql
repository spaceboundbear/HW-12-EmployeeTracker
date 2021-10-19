DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

-- create tables for department, employee, and role
CREATE TABLE department (
    id: INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    f_name: VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
    id: INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL,
    department_id: INT,
)

CREATE TABLE employee (
    id: INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT NOT NULL,
    manager_id: INT NULL,
)