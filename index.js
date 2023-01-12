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
                viewDepts();

            }
            else if (ans.options === "View role") {
                viewrole();

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
