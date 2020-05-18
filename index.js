var mysql = require('mysql');
var inquirer = require('inquirer');
const cTable = require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Iloveskymarie1!",
    database: "employeeTrackerDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "Start",
            type: "list",
            message: "Would you like to access [Employees], [Departments], [Roles] or EXIT?",
            choices: ["Employees", "Departments", "Roles", "EXIT"]
        })
        .then(function (answer) {
            if (answer.Start === "Employees") {
                employees();
            }
            else if (answer.Start === "Departments") {
                departments();
            } else if (answer.Start === "Roles") {
                roles();
            } else {
                connection.end();
            }
        });
}

// Add Update or View Employees
function employees() {
    inquirer
        .prompt({
            name: "employees",
            type: "list",
            message: "Would you like to [Add], [Delete], [Update], or [View] employees?",
            choices: ["Add", "Delete", "Update", "View", "EXIT"]
        })
        .then(function (answer) {
            if (answer.employees === "Add") {
                addEmployee();
            }
            else if (answer.employees === "Delete") {
                deleteEmployee();
            } else if (answer.employees === "Update") {
                updateEmployee();
            } else if (answer.employees === "View") {
                viewEmployee();
            } else {
                connection.end();
            }
        });
}

function addEmployee() {
    inquirer
        .prompt([{
            name: "firstName",
            message: "First Name:",
        }, {
            name: "lastName",
            message: "Last Name:",
        },
        ])
        .then(function (answer) {
            var lastName = answer.lastName;
            var firstName = answer.firstName;
            console.log("\n1 new employee inserted!\n");
            var query = connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: firstName,
                    last_name: lastName,
                },
                async function (err, res) {
                    if (err) throw err;
                    //console.log(res.affectedRows + " employee inserted!\n");
                    // Call viewEmployee AFTER the INSERT completes
                    //viewEmployee();
                }
            );
            // logs the actual query being run
            //console.log(query.sql);
            start();
        });
}

function deleteEmployee() {
    inquirer
        .prompt({
            name: "employeeName",
            message: "First name of employee you would like to delete:"
        })
        .then(function (answer) {
            var employeeName = answer.employeeName;
            console.log("\nEmployee Deleted...\n");
            var query = connection.query(
                "DELETE FROM employees WHERE ?",
                [
                    {
                        first_name: employeeName
                    }
                ],
                function (err, res) {
                    if (err) throw err;

                }
            );
            start();
            // logs the actual query being run
            //console.log(query.sql);
        });
}

// function updateEmployee() {
//     console.log("Updating employees...\n");
//     var query = connection.query(
//         "UPDATE employees SET ? WHERE ?",
//         [
//             {
//                 quantity: 100
//             },
//             {
//                 flavor: "Rocky Road"
//             }
//         ],
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " products updated!\n");
//             // Call deleteProduct AFTER the UPDATE completes
//             deleteProduct();
//         }
//     );

//     // logs the actual query being run
//     console.log(query.sql);
// }

function viewEmployee() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        // for (var i = 0; i < res.length; i++) {
        //     console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
        // }
        // console.log("-----------------------------------");
        start();
    });
}

// Add Update or View Departments
function departments() {
    inquirer
        .prompt({
            name: "departments",
            type: "list",
            message: "Would you like to [Add], [Update], or [View] departments?",
            choices: ["Add", "Delete", "View", "EXIT"]
        })
        .then(function (answer) {
            if (answer.departments === "Add") {
                addDepartment();
            }
            else if (answer.departments === "Delete") {
                deleteDepartment();
            } else if (answer.departments === "View") {
                viewDepartments();
            } else {
                connection.end();
            }
        });
}

function addDepartment() {
    inquirer
        .prompt({
            name: "departmentName",
            message: "New Department:"
        })
        .then(function (answer) {
            var departmentName = answer.departmentName;
            console.log("\n1 new department inserted!\n");
            var query = connection.query(
                "INSERT INTO department SET ?",
                {
                    name: departmentName,
                },
                async function (err, res) {
                    if (err) throw err;
                    //console.log(res.affectedRows + " employee inserted!\n");
                    // Call viewEmployee AFTER the INSERT completes
                    //viewEmployee();
                }
            );
            // logs the actual query being run
            //console.log(query.sql);
            start();
        });
}

function deleteDepartment() {
    inquirer
        .prompt({
            name: "departmentName",
            message: "What department would you like to delete?"
        })
        .then(function (answer) {
            var departmentName = answer.departmentName;
            console.log("\nDepartment Deleted...\n");
            var query = connection.query(
                "DELETE FROM department WHERE ?",
                [
                    {
                        name: departmentName
                    }
                ],
                function (err, res) {
                    if (err) throw err;

                }
            );
            start();
            // logs the actual query being run
            //console.log(query.sql);
        });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        // for (var i = 0; i < res.length; i++) {
        //     console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
        // }
        // console.log("-----------------------------------");
        start();
    });
}

// Add Update or View Departments
// function roles() {
//     inquirer
//         .prompt({
//             name: "",
//             type: "list",
//             message: "Would you like to [Add], [Update], or [View] departments?",
//             choices: ["Add", "Update", "View", "EXIT"]
//         })
//         .then(function (answer) {
//             if (answer.departments === "Add") {
//                 addDepartment();
//             }
//             else if (answer.departments === "Update") {
//                 updateDepartment();
//             } else if (answer.departments === "View") {
//                 viewDepartments();
//             } else {
//                 connection.end();
//             }
//         });
// }