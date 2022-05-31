const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const request = require('request');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    user: 'new_user',
    host: 'localhost',
    password: 'password',
    database: 'myemployeesystem'
});

app.use(cors());
app.use(express.json());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/create', (req,res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const stock = req.body.stock;

    db.query(
        'INSERT INTO Products (name, price, description, stock) VALUES (?,?,?,?)', 
        [name, price, description, stock], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});

app.get('/Products', (req,res) => {
    db.query("SELECT * FROM Products", (err,result)=>{
        if(err) {
            console.log(err)
        } else{
            res.send(result)
        }
    })
});

app.put('/updateName', (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    db.query("UPDATE Products SET  name = ? WHERE id = ?", [name, id], (err, result)=>{
        if (err) {
           console.log(err) 
        } else {
         res.send(result)
        }
    }); 
 });
 
 app.put('/updateprice', (req,res) => {
    const id = req.body.id;
    const price = req.body.price;
    db.query("UPDATE Products SET  price = ? WHERE id = ?", [price, id], (err, result)=>{
        if (err) {
           console.log(err) 
        } else {
         res.send(result)
        }
    }); 
 });

 app.put('/updatedescription', (req,res) => {
    const id = req.body.id;
    const description = req.body.description;
    db.query("UPDATE Products SET  description = ? WHERE id = ?", [description, id], (err, result)=>{
        if (err) {
           console.log(err) 
        } else {
         res.send(result)
        }
    }); 
 });
 

app.put('/updatestock', (req,res) => {
   const id = req.body.id;
   const stock = req.body.stock;
   db.query("UPDATE Products SET  stock = ? WHERE id = ?", [stock, id], (err, result)=>{
       if (err) {
          console.log(err) 
       } else {
        res.send(result)
       }
   }); 
});


app.delete('/delete/:id',  (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM Products WHERE id = ?", id, (err, result) =>{
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});



app.listen(8000, ()=> {
    console.log("Yey, your server is running on port 3001")
});