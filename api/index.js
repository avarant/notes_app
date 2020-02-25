const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express()
app.use(bodyParser.json());
app.use(cors());

const PORT = 3001

const mysql=require('mysql');
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Skittles',
    database:"notes"
});

con.connect((err)=>{
  if(err) console.log("error connecting to database");
  else console.log("connected");
})


const orange_theory = [
  {
    duration:3,
    pace:"warmup"
  },
  {
    duration:2,
    pace:"base"
  },
  {
    duration:3,
    pace:"push"
  },
  {
    duration:2,
    pace:"base"
  },
  {
    duration:1,
    pace:"all-out"
  },
  {
    duration:1,
    pace:"walk"
  },

  {
    duration:1,
    pace:"base"
  },
  {
    duration:2,
    pace:"push"
  },
  {
    duration:1,
    pace:"base"
  },
  {
    duration:2,
    pace:"push"
  },
  {
    duration:1,
    pace:"base"
  },
  {
    duration:1,
    pace:"all-out"
  },
  {
    duration:1,
    pace:"walk"
  },

  {
    duration:1,
    pace:"all-out"
  },
  {
    duration:1,
    pace:"walk"
  },
  {
    duration:1,
    pace:"all-out"
  },
  {
    duration:1,
    pace:"walk"
  },
  {
    duration:1,
    pace:"all-out"
  },
  {
    duration:1,
    pace:"walk"
  }, 
];

function query_db(sql){
  con.query(sql,(err,rows)=>{
    // console.log("querying...");
  });
}

//CREATE
app.post('/notes', function (req, res) {
  const sql=`INSERT INTO text (title, body, created, modified) VALUES ('${req.body.title}','${req.body.body}','${req.body.date_created}','${req.body.date_modified}')`;
  console.log(sql);
  query_db(sql);
})

//READ
app.get('/notes',function(req,res){
  const sql="SELECT * FROM text";
  console.log(sql);
  con.query(sql, (err, rows) => {
    if(!err) res.send(rows);
  });
})

//UPDATE
app.post('/notes/update/:id',function(req,res){
  const sql=`UPDATE text SET title='${req.body.title}', body='${req.body.body}', modified='${req.body.date_modified}' WHERE id=${req.body.id}`;
  console.log(sql);
  query_db(sql);
})

//DELETE
app.delete('/notes/delete/:id',function(req,res){
  const sql=`DELETE FROM text WHERE id=${req.params.id}`;
  console.log(sql);
  query_db(sql);
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})