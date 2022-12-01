const express=require('express');
const path=require('path')
const app=express();
const fs=require('fs')
const port= process.env.PORT || 80;


const static_path=path.join(__dirname,"../public")
app.use(express.static(static_path))

app.get('',(req,res)=>{
    res.render('index')
})
html=""
app.get('/about',(req,res)=>{
    res.setHeader("content-type", "text/html");
    fs.readFileSync('../public/about.html','utf-8')
    
})

app.get('/weather',(req,res)=>{
    res.render('../public/weather.html')

})

app.get('*',(req,res)=>{
    res.render('404')
})



app.listen(port,()=>{
    console.log('server is listening',port)
})