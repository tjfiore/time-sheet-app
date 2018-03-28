const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function (err) {
  if (err){
    console.log('Error connecting to db');
  }else{
    console.log("Connected!");
  }
  

  con.query("CREATE DATABASE timesheetdb", function (err, result) {
    if (err) {
      console.log('Error: ', err);
    }else{
      console.log("Database created");
    }    
  });

  const sql = "CREATE TABLE employees (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});