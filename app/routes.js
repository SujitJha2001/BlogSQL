const express = require('express');
const path = require('path');
const router = express.Router();
const DB = require('../database/connection.js')
const Prevention = require('sqlstring')//no need of this

router.get("/",(req, res)=>{
    DB.query("SELECT * FROM blogs",(err, result) =>{
        if(err)
        {
            console.log(err);
        } 
        else
        {
            res.render(path.join(__dirname,"../views/home.ejs"),{result});
        }
    });
});

router.get("/create",(req, res)=>{
    res.render(path.join(__dirname,"../views/create.ejs"));
});

router.post("/create",(req, res)=>{
    DB.query(`INSERT INTO blogs 
    (title,img_url,description) 
    values('${req.body.title}','${req.body.img_url}','${req.body.description}')`, 
    (err, result) => {
        if(err)
        {
            console.log(err);
        } 
        else
        {
            res.redirect("/");
        }
    });    
});
router.get("/show/:id", (req, res) => {
    DB.query(`SELECT * FROM blogs WHERE id= ${req.params.id}`, (err, result) => {
        if(err)
        {
            console.log(err);
        } 
        else
        {
            res.render(path.join(__dirname,"../views/show.ejs"),{result});
        }
    });
  });

router.get("/edit/:id", (req, res) => {
    DB.query(`SELECT * FROM blogs WHERE id= ${req.params.id}`, (err, result) => {
        if(err)
        {
            console.log(err);
        } 
        else
        {
            res.render(path.join(__dirname,"../views/edit.ejs"),{result});
        }
    });
  });

router.put("/edit/:id", (req, res) => {
    //console.log(req.body);
    DB.query(`UPDATE blogs 
    SET title= '${req.body.title}', 
    img_url= '${req.body.img_url}' ,
    description= '${req.body.description}' 
    WHERE id=${req.params.id}`, 
    (err, result) => {
        if(err)
        {
            console.log(err);
        } 
        else
        {
            res.redirect("/");
        }
    });
  });

router.get("/delete/:id", (req, res) => {
    DB.query(`DELETE FROM blogs WHERE id=${req.params.id}`, (err, result) => {
        if(err)
        {
            console.log(err);
        } 
        else
        {
            res.redirect("/");
        }
    });
  });

module.exports = router

