const mysql      = require('mysql');
const express    = require('express');
var   app        = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

var mysqlconnection = mysql.createConnection({
 host: 'mysql.seenerg.kinghost.net',
 user: 'seenerg',
 password: 'koala2019',
 database: 'seenerg',
 multipleStatements: true
})

const M0001 = 'employees';

app.listen(21215,() => console.log('Express Server is running at port number 21215'));
//Get all employees throughout alias M0001
app.get('/cliente/', (req,res) => {
  mysqlconnection.query('select * from cliente ',(err,rows,fields)=>{
  if(!err)
    res.send(rows);
  else
    console.log(err);
  })
})
//Get an employee - using an id parameter
app.get('/cliente/:id', (req,res) => {
    mysqlconnection.query('select * from cliente where Id = ?',[req.params.id],(err,rows,fields)=>{
    if(!err)
      res.send(rows);
    else
      console.log(err);
    });
});
//Delete an employee - usinng a parameter
app.delete('/employees/:id', (req,res) => {
    mysqlconnection.query('delete from Employee where EmpId = ?',[req.params.id],(err,rows,fields)=>{
    if(!err)
        res.send(rows); //      res.send('{Deleted successful !}');
    else
      console.log(err);
    });
});
//Update an employee - usinng a parameter
app.put('/employees/', (req,res) => {
    let emp = req.body;
    var sql = "set @EmpID = ?; set @Name = ?; set @EmpCode = ?; set @Salary = ?; \
     CALL sp_update_employee(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlconnection.query(sql, [emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
    if(!err)
    rows.forEach(element => {
      if (element.constructor == Array)
        res.send(' Atualizado o registro : ' +  element[0].EmpID);
     });
    else
      console.log(req.body);
    });
  });
//Insert a new employee
app.post('/employees/', (req,res) => {
    let emp = req.body;
    var sql = "set @EmpID = ?; set @Name = ?; set @EmpCode = ?; set @Salary = ?; \
    CALL sp_insert_employee(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlconnection.query(sql, [emp.EmpID, emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
    if(!err)
      rows.forEach(element => {
        if (element.constructor == Array)
          res.send(' Inserido o registro : ' +  element[0].EmpID);
       });
      else
        console.log(err);
      });
    });
