const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
 

  con.query("CREATE DATABASE timesheet", function (err, result) {
    if (err) throw err;
      console.log("Database created");
  });
    
    
  const employees = 'CREATE TABLE employees (id int(12) PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255) UNIQUE NOT NULL,    password VARCHAR(255) NOT NULL,first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL)';
  con.query(employees, function (err, result) {
    if (err) throw err;
    console.log("Employees Table created.");
  });

  const clients = 'CREATE TABLE clients (id INT AUTO_INCREMENT PRIMARY KEY, client_name VARCHAR(255) NOT NULL manager_name VARCHAR(255) NOT NULL, position VARCHAR(255) NOT NULL)';    
  con.query(clients, function (err, result) {
    if (err) throw err;
    console.log("Clients Table created.");
  });

    // con.query(`CREATE PROCEDURE save_data (IN name varchar(255),IN address varchar(255),IN branch varchar(50))
    //    BEGIN
    //     insert into student (name,user_name,branch) values (in_name ,in_user_name,in_branch);
    // END`, function (err, result) {
    //   if (err) throw err;
    //   console.log("Store procedure created.");
    // });

    


  
});