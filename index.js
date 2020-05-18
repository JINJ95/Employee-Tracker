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
    password: "",
    database: "employeeTrackerDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    //display employees after connection is made
    // displayAll();
    // run the start function to prompt user
    start();
});

// function which prompts the user for what action they should take
function start() {
    
    inquirer
        .prompt({
            name: "Start",
            type: "list",
            message: "What would you like to do?",
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
            choices: ["Add", "Delete", "Update Role", "View", "EXIT"]
        })
        .then(function (answer) {
            if (answer.employees === "Add") {
                addEmployee();
            }
            else if (answer.employees === "Delete") {
                deleteEmployee();
            } else if (answer.employees === "Update Role") {
                updateEmployeeRole();
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
                function (err, res) {
                    if (err) throw err;
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
            name: "employeeId",
            message: "Id # of employee you would like to delete:"
        })
        .then(function (answer) {
            var employeeId = answer.employeeId;
            console.log("\nEmployee Deleted...\n");
            var query = connection.query(
                "DELETE FROM employees WHERE ?",
                [
                    {
                        id: employeeId
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

function updateEmployeeRole() {
    inquirer.prompt([{
        name: "firstName",
        message: "First Name of employee:"
    }, {
        name: "updatedRole",
        type: "list",
        message: "Enter [1] Sales, [2] Engineering, [3] Finance, [4] Legal:",
        choices: ["1", "2", "3", "4"]
    }]).then(function (answer) {
        console.log("\nUpdated employee role...\n");
        if (answer.updatedRole === "1") {
            var query = connection.query(
                "UPDATE employees SET ? WHERE ?",
                [
                    {
                        role_id: 1
                    },
                    {
                        first_name: answer.firstName
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        if (answer.updatedRole === "2") {
            var query = connection.query(
                "UPDATE employees SET ? WHERE ?",
                [
                    {
                        role_id: 2
                    },
                    {
                        first_name: answer.firstName
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        if (answer.updatedRole === "3") {
            var query = connection.query(
                "UPDATE employees SET ? WHERE ?",
                [
                    {
                        role_id: 3
                    },
                    {
                        first_name: answer.firstName
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        if (answer.updatedRole === "4") {
            var query = connection.query(
                "UPDATE employees SET ? WHERE ?",
                [
                    {
                        role_id: 4
                    },
                    {
                        first_name: answer.firstName
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                }
            );
        }
        start();
        // logs the actual query being run
        //console.log(query.sql);
    });
}

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
                function (err, res) {
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

// Add Update or View roles
function roles() {
    inquirer
        .prompt({
            name: "roles",
            type: "list",
            message: "Would you like to [Add], [Delete], [Update], or [View] roles?",
            choices: ["Add", "Delete", "Update", "View", "EXIT"]
        })
        .then(function (answer) {
            if (answer.roles === "Add") {
                addRole();
            }
            else if (answer.roles === "Delete") {
                deleteRole();
            } else if (answer.roles === "Update") {
                updateRoles();
            } else if (answer.roles === "View") {
                viewRoles();
            } else {
                connection.end();
            }
        });
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        // for (var i = 0; i < res.length; i++) {
        //     console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
        // }
        // console.log("-----------------------------------");
        start();
    });
}

function addRole() {
    inquirer
        .prompt([{
            name: "title",
            message: "Role Title:"
        }, {
            name: "salary",
            message: "Role Salary:"
        }, {
            name: "departmentId",
            message: "Role Department Id (Must Be a # 1-4):"
        }])
        .then(function (answer) {
            var roleTitle = answer.title;
            var roleSalary = answer.salary;
            var roleDepartmentId = answer.departmentId;
            console.log("\n1 new role inserted!\n");
            var query = connection.query(
                "INSERT INTO role SET ?",
                {
                    title: roleTitle,
                    salary: roleSalary,
                    department_id: roleDepartmentId
                },
                function (err, res) {
                    if (err) throw err;
                }
            );
            // logs the actual query being run
            //console.log(query.sql);
            start();
        });
}

function deleteRole() {
    inquirer
        .prompt({
            name: "roleName",
            message: "Title of role you would like to delete?"
        })
        .then(function (answer) {
            var roleName = answer.roleName;
            if (answer.roleName == "") {
                console.log("\nNo Role Deleted...\n");
                return start()
            }
            console.log("\nRole Deleted...\n");
            var query = connection.query(
                "DELETE FROM role WHERE ?",
                [
                    {
                        title: roleName
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

function updateRoles() {
    inquirer
        .prompt([{
            name: "roleName",
            message: "Title of role you would like to Update:"
        }, {
            name: "updateChoice",
            type: "list",
            message: "Would you like to Update [Title], [Salary], [Department Id], or [Exit]?",
            choices: ["Title", "Salary", "Department Id", "EXIT"]
        }, {
            name: "roleContent",
            message: "New Content:"
        }])
        .then(function (answer) {
            var roleName = answer.roleName;
            var roleContent = answer.roleContent;
            var column;
            if (answer.roleName == "") {
                console.log("\nNo Role Updated...\n");
                return start()
            }
            if (answer.updateChoice === "Title") {
                var query = connection.query(
                    "UPDATE role SET ? WHERE ?",
                    [
                        {
                            title: roleContent
                        },
                        {
                            title: roleName
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                    }
                );
            }
            else if (answer.updateChoice === "Salary") {
                var query = connection.query(
                    "UPDATE role SET ? WHERE ?",
                    [
                        {
                            salary: roleContent
                        },
                        {
                            title: roleName
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                    }
                );
            } else if (answer.updateChoice === "Department Id") {
                var query = connection.query(
                    "UPDATE role SET ? WHERE ?",
                    [
                        {
                            department_id: roleContent
                        },
                        {
                            title: roleName
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                    }
                );
            } else {
                connection.end();
            }
            console.log("\nRole Updated...\n");
            start();
        });
    // logs the actual query being run
    //console.log(query.sql);
}

// function displayAll (){
//     connection.query("SELECT id FROM employees FULL OUTER JOIN department ON employees.id = department.id", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//         start();
//     });
// }