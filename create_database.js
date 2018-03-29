const mysql = require('mysql');

const employees = `CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL, 
  last_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
const insert_employees = `INSERT INTO employees (id, email, password, first_name, last_name, address) VALUES
(1, 'tjae@gmail.com', 'password', 'Tjae', 'Fiore', '52 Goldsmith Villa'),
(2, 'joe@gmail.com', 'password1', 'Joe', 'Bidden', '20 Oxford Park Avenue'),
(3, 'erza@yahoo.com', 'password2', 'Erza', 'Scarlet', '31 Barbican Road'),
(4, 'bob@yahoo.com', 'password2', 'Bobby', 'Stone', '36 Old Hope Road');`;

const clients = `CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  client_name VARCHAR(255) NOT NULL, 
  manager_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
const insert_clients = `INSERT INTO clients (id, client_name, manager_name, position) VALUES
(1, 'Burt Solomon', 'Burt Solomon', 'Manager'),
(2, 'Perry White', 'Morgan Edge', 'Photographer'),
(3, 'Sophia Freeman', 'Cindy Lapor', 'Junior Dev'),
(4, 'Dilan MattLand', 'Cherl White', 'Payroll Officer');`;

const time_results = `CREATE TABLE time_results (
  id int(12) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  task_name varchar(255) NOT NULL,
  start_time varchar(50) NOT NULL,
  end_time varchar(50) NOT NULL,
  sdate varchar(50) NOT NULL,
  comments varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!"); 
});


con.query("CREATE DATABASE timesheet ENGINE=InnoDB DEFAULT CHARSET=utf8;", function (err) {
  if (err){
    console.log('Database Error: ', err);
    con.end();
  } 
  console.log("Database created.");

  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "timesheet"
  });

  conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected to timesheetdb!"); 
  });
  

  conn.query(employees, function (err) {
    if (err){
      console.log('Employees Error: ',err);
      conn.end();
    } 
    console.log("employees table created.");
    conn.query(insert_employees, function (err) {
      if (err){
        console.log('Insert Employees Error: ',err);
        conn.end();
      } 
      console.log("Successfully inserted into employees table.");
    });    
  });

  conn.query(clients, function (err, result) {
    if (err){
      console.log('Clients Error: ',err);
      conn.end();
    } 
    console.log("clients table created.");
    conn.query(insert_clients, function (err) {
      if (err){
        console.log('Insert Clients Error: ',err);
        conn.end();
      } 
      console.log("Successfully inserted into clients table.");
    });     
  });

  conn.query(time_results, function (err, result) {
    if (err){
      console.log('Time Results Error: ', err);
      conn.end();
    } 
      console.log("time Results Table created.");
    
  });

  con.end();
    
});