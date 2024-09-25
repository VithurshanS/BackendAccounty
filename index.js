const {handleGet,handlePost} = require("./api.js")
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
app.use(cors());
app.use(express.json());

const users = []




const database = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user:'sql12733449',
    password:'aNgaFw3kaM',
    database: 'sql12733449',
    port:3306
})
/*const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
*/

database.connect((error)=>{
    if(error){
        console.log("error occured",error);
    }
    else{
        console.log("database successfully connected");
    }
})



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
      database.query(quer, (err, result) => {
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
        database.query(query,[s_ID,i_ID],(err,result)=>{
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