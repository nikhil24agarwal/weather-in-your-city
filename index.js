const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile( __dirname + "/index.html");
    
})

app.post("/", function(req,res){
    // console.log(req.body.cityName);
    const city= req.body.cityName;
    const api_key= "0afe2514279e45dabe681a088668bca2";
    const units="metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_key+"&units="+units+"";
    https.get(url,function(response){
        response.on("data",function(data){   //to get what data is delivered in response
        const a=JSON.parse(data);
        const temp= a.main.temp ;
        const weather= a.weather[0].description;
        const icon=a.weather[0].icon;
        const imageUrl="http://openweathermap.org./img/wn/"+ icon + "@2x.png";
        console.log(imageUrl);
        res.write("<p>The weather is currently " +weather+" <p>");
        res.write("<h1>the tempreture in  "+ city +" " + temp + "</h1>");
        res.write("<img src=" + imageUrl +">");
        res.send();
        })
    
    })
    
    
})

app.listen(3000, function(){
    console.log("app chlgya");
})



