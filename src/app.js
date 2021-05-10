const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const request = require("requests");

const partialspath = (path.join(__dirname,"../partials"));
const templatepath = (path.join(__dirname,"../views"));
// const static = (path.join(__dirname,"../public")); 

console.log(templatepath);
// app.use(express.static(static));


//to set the view engine *******
app.set("view engine","hbs");


//partials are like component in react  ***********
hbs.registerPartials(partialspath);

//to change the default name view to access another name folder *******************
 app.set("views",templatepath);



//template engine route
app.get("/",(req,res)=>{
    res.render('index',{
        firstname :"this is dynamic data send by server ", 
    });
});


//show external file of html
//name of the file should be index.html  

app.get("/",(req,res)=>{
    res.send("hello");
});

app.get("/about",(req,res)=>{
    request("http://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=ff050ca3a7f1538376b21618dd745ae9")
    .on("data",(chunk) =>{
        const obdata = JSON.parse(chunk);
        const arrdata = [obdata];
res.render("about",{
    name : arrdata[0].name,
    temp : arrdata[0].main.temp,

    errorcomment : "this is about page data dynamically",
});
});
});

app.listen(8000,()=>{
    console.log("hello from the express ");
});


app.get("*",(req,res)=>{
res.render("404",{
errorcomment : "error"
});
});
