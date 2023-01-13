const inquirer = require('inquirer');
const fs = require('fs');
var mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456789",
    database: "employeeDB"
});

function runApp() {
    inquirer
        .prompt({
            type: "list",
            message: "What would you like to do?",
            name: "options",
            choices: ['View All Employees', 'View Department', 'View Role', 'Add Employee', 'Add Department', 'Add Role', 'Update Role']
        })
        .then(function (ans) {
            console.log(ans);

            if (ans.options === "View All Employees") {
                viewAllEmployees();
            }
            else if (ans.options === "View Department") {
                viewDepartments();

            }
            else if (ans.options === "View Role") {
                viewRole();

            }
            else if (ans.options === "Add Employee") {
                addEmployee();

            }
            else if (ans.options === "Add Department") {
                addDept();

            }
            else if (ans.options === "Add Role") {
                addRole();

            }
            else if (ans.options === "Update Role") {
                updateRole();

            } else {
                connection.end();
            }
        });
}

async function viewAllEmployees() {
    console.log(' ');
    await connection.query('SELECT e.id, e.first_name AS First_Name, e.last_name AS Last_Name, title AS Title, salary AS Salary, name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        runApp();
    });
};

async function viewDepartments() {
    console.log(' ');
    await connection.query('SELECT id, name AS department FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        runApp();
    })
};


console.log(`
╔═══╗─────╔╗──────────────╔═╗╔═╗
║╔══╝─────║║──────────────║║╚╝║║
║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
───────║║──────╔═╝║─────────────────────╔═╝║
───────╚╝──────╚══╝─────────────────────╚══╝
──────────────────────────────────────────────────
         Develop by Vimukthi Gunasekara
──────────────────────────────────────────────────
──────────────────────────────────────────────────`);

runApp();

