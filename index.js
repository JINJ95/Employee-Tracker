var mysql = require('mysql');
var inquirer = require('inquirer');

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
            message: "Would you like to [Add], [Update], or [View] departments, roles, and employees?",
            choices: ["Add", "Update", "View", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.postOrBid === "Add") {
                addEmployee();
            }
            else if (answer.postOrBid === "Update") {
                updateEmployee();
            } else if (answer.postOrBid === "View") {
                viewEmployee();
            } else {
                connection.end();
            }
        });
}


function addEmployee() {
    return
}

function updateEmployee() {
    return
}

function viewEmployee() {
    return
}