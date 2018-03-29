const mysql = require('mysql');

const employees = 'CREATE TABLE employees (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL,    password VARCHAR(255) NOT NULL,first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL)';
const clients = 'CREATE TABLE clients (id INT AUTO_INCREMENT PRIMARY KEY, client_name VARCHAR(255) NOT NULL, manager_name VARCHAR(255) NOT NULL, position VARCHAR(255) NOT NULL)';   

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!"); 
});

  con.query("CREATE DATABASE timesheet", function (err, result) {
    if (err) throw err;
      console.log("Database created");

    // con.query(employees, function (err, result) {
    //   if (err) throw err;
    //   console.log("Employees Table created.");
    // });


    // con.query(clients, function (err, result) {
    //   if (err) throw err;
    //   console.log("Clients Table created.");
    // });
    

  });
    



con.end();
