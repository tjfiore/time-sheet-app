const express = require('express'),
      http = require('http'),
      bodyParser = require('body-parser'), 
      mysql = require('mysql');

const app = express();

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'timesheetdb'
});

app.use(bodyParser.json({ type: '*/*' }));

conn.connect((err) => {
  if (err) throw err;
  console.log('Connected to mysql db!');
});

  app.get('/', function (req, res) {
    res.send('Please use /api/users or /api/tasks');
  });
  

  app.get('/users', (req, res) => {
    conn.query('SELECT * from employees', (err, users) => {
      if (err) throw err; 
      res.json(users);
    });     

  });

  app.post('/signin', (req, res) => {
       
    const email = req.body.email;
    const password = req.body.password;
    
    conn.query('SELECT * from employees WHERE email = ? AND password = ?', [email, password], (err, user) => {
     if (err) throw err; 
      
      if(user.length > 0 ){
        res.json({user});
      } else { 
        res.json({ error: 'Please check credentials' });
      } 
    });

  });




const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('server listening on port: ', port);

