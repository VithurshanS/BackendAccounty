const {handleGet,handlePost} = require("./api.js")
const express = require('express');
const mysql = require('mysql2');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
app.use(cors());
app.use(express.json());

const users = []

const dbPath = './accounty.db'; // SQLite database file stored in the project folder
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create a table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    balance REAL
)`);



/*const database = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'vithu',
    database: 'accounty'
})*/
/*const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
*/
/*
db.connect((error)=>{
    if(error){
        console.log("error occured")
    }
    else{
        console.log("database successfully connected");
    }
})
*/


function scri(data){
    return new Promise((resolve,reject)=>{
        if(data===null){
            return reject("error");
        }
        users.push(data);
        resolve("done");
    })
}

function nun(){
    return new Promise((resolve,reject)=>{
        resolve(users);
    })
}
  
function ss() {
    return new Promise((resolve,reject) => {
      let quer = "SELECT * FROM accounts;";
      db.all(quer,[],(err, result) => {
        if (err) {
          console.log('Error occurred:', err);
          return reject(err);
        }
        resolve(result);
      });
    });
}

function inputdata(body){
    return new Promise((resolve,reject)=>{
        const {s_ID,i_ID} = body;
        if(body === null){
            console.log("no data");
        }
        //res.send("data successfully inserted");
        const query = 'insert into accounts (name,balance) values (?,?);'
        db.run(query,[s_ID,i_ID],(err,result)=>{
            if(err){
                return reject(err);
            }
            resolve(result);
        })

    })
}

handlePost(app,"/input",inputdata);
handleGet(app, '/', ss);
handlePost(app,"/hel",scri);
handleGet(app,"/print",nun);



app.listen(3055,()=>{
    console.log('server started');
})