const express = require('express'),
      http = require('http'),
      bodyParser = require('body-parser'), 
      mysql = require('mysql'),
      cors = require('cors');

const app = express();

const sql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'timesheetdb'
});

app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());

sql.connect((err) => {
  if (err) throw err;
  console.log('Connected to mysql db');
});

  app.get('/', function (req, res) {
    res.send('Please use /api/users or /api/tasks');
  });

  app.get('/clients', (req, res) => {
    sql.query('SELECT id, client_name FROM clients', (err, clients) => {
      if (err) throw err;
      res.json(clients);
    });

  });

  app.post('/position/manager', (req, res) => {
    const client = req.body.data;
    sql.query('SELECT manager_name, position FROM clients WHERE client_name = ?',[client], (err, results) => {
      if (err) throw err; 
        
      if (results.length > 0) {
        res.json(results);
      }
    });    
  });

  app.post('/signin', (req, res) => {
       
    const email = req.body.email;
    const password = req.body.password;
    
    sql.query('SELECT * FROM employees WHERE email = ? AND password = ?', [email, password], (err, user) => {
      if (err) throw err; 
      
      if(user.length > 0 ){
        res.json(user);
      } else { 
        res.json({ error: 'Please check your credentials' });
      } 
    });
  });




const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('server listening on port: ', port);

