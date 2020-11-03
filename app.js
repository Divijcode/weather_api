const express =require("express");
const app=express();
const https=require("https");
const BodyParser=require("body-parser");


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(BodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

  res.sendFile(__dirname+ "/index.html");
});


app.post("/",function(req,res){
  const place=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid=e7434204586cebab6a542fc53fadf46c&units=metric"

  https.get(url,function(response){
    console.log(response.statusCode);
if(response.statusCode==200){
    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
      const temperature=weatherdata.main.temp;
      const icon =weatherdata.weather[0].icon;
      const des=weatherdata.weather[0].description;
      const place =weatherdata.name;
      const imageurl="http://openweathermap.org/img/wn/" +icon+ "@2x.png";
      res.render("weather",{temp:temperature ,imageurl:imageurl,des:des,place:place});
});
}
if(response.statusCode==404){
  res.send("<h1>OOPSIE! Check if you entered valid name :)</h1>");
}
      // res.write("<h1>"+temp+"</h1>  ");
      // res.write(" <img src="+ imageurl +">");

});
});


    // })
  // })

app.post("/weather",function(req,res){
  res.redirect("/");
});
app.listen(3000,function(){
  console.log("server started");
});
