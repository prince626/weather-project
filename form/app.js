require('dotenv').config()
const express=require('express')
const app=express();
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const port=process.env.PORT || 80;
const path=require('path');
const hbs=require('hbs')
require("./mongoose")
const Register=require("./register");
const { error } = require('console');

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const templatepath=path.join(__dirname,"./views")
app.set("view engine","hbs")
app.set("view engine","ejs")

hbs.registerPartials(templatepath)

app.get("/",(req,res)=>{
    res.render('index')

})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/register",async(req,res)=>{
    // let token;
    try {
        const employee= new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            fathername:req.body.fathername,
            phonenumber:req.body.phonenumber,
            email:req.body.email,
            age:req.body.age,
            password:req.body.password,
            cityname:req.body.cityname,
            statename:req.body.statename,
            gender:req.body.gender,
            yes:req.body.yes
        })
        // console.log("the sucess part is"+employee)

      const token=await employee.generateAuthToken();
        console.log("the token is "+ token)
        const registered=await employee.save()
        res.status(201).render("index")
    } catch (e) {
        console.log(error)
        res.send("please enter a unique phone number,password and email")
    }
})
app.post("/login",async(req,res)=>{
    try {
          const email=req.body.email
            const password=req.body.password
            const useremail=await Register.findOne({email:email})
            const ismatch=await bcrypt.compare(password,useremail.password)


            const token=await useremail.generateAuthToken();
            console.log("the login token is "+ token)
           
            if (ismatch) {
                res.status(201).render("index")
            } else {
                res.send("please valid a+ password")
            }
            
    } catch (e) {
        console.log("error")
        res.send("error")
    }
})

app.listen(port,()=>{
    console.log(`listening on ${port}`)
})