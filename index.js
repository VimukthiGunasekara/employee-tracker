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
                addDepartment();

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

async function viewRole() {
    console.log(' ');
    await connection.query('SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        runApp();
    })
};

var roleChoices = [];
var empChoices = [];

async function addEmployee() {
    checkRole()
    checkEmployee()
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter the  Employee's First Name:",
            // validate: (firstName) => {
            //     if (firstName.trim().length <= 30 && !firstName) {
            //         return true;
            //     }
            //     else {
            //         console.log('The input is invalid. The maximum length of your input should be 30 characters.!');
            //         return false;
            //     }
            // }
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter the Employee's Last Name:",
        },
        {
            name: "role",
            type: "list",
            message: "Choose the Employee Role:",
            choices: roleChoices
        },
        {
            name: "manager",
            type: "list",
            message: "Choose the Employee's Manager:",
            choices: empChoices
        }
    ]).then(answer => {
        var getRoleId = answer.role.split("-")
        var getReportingToId = answer.manager.split("-")
        var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}','${answer.lastName}','${getRoleId[0]}','${getReportingToId[0]}')`;
        connection.query(query, function (err, res) {
            console.log(`new employee ${answer.firstName} ${answer.lastName} ${getRoleId[0]} ${getReportingToId[0]} added!`)

        });
        runApp();
    });
};

function checkRole() {

    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            roleChoices.push(data[i].id + "-" + data[i].title)
        }
    })
}

function checkEmployee() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            empChoices.push(data[i].id + "-" + data[i].first_name + " " + data[i].last_name)
        }
    })
}

async function addDepartment() {
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "Enter New Department Name : "
        }
    ]).then(answer => {
        var query = `INSERT INTO department (name) VALUES ('${answer.departmentName}')`;
        connection.query(query, function (err, res) {
            console.log(`${answer.departmentName} was added to departments.`);
        });
        runApp();
    })
};

var deptChoices = [];

async function addRole() {

    checkRole()
    checkEmployee()
    checkDepartment()

    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Enter the Role Title :"
        },

        {
            name: "dept",
            type: "list",
            message: "In what department would you like to add this role?",
            choices: deptChoices
        },

        {
            name: "salary",
            type: "number",
            message: "Enter the role's salary:"
        },

    ]).then(function (answer) {
        console.log(`${answer.role}`)
        var getDeptId = answer.dept.split("-")
        var query = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.role}','${answer.salary}','${getDeptId[0]}')`;
        connection.query(query, function (err, res) {
            console.log(`${answer.role} added!`)
        });
        runApp();
    });
};

function checkDepartment() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            deptChoices.push(data[i].id + "-" + data[i].name)
        }
    })
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

