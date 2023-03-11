const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const https = require('https');

// const request = require('request');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
    const First = req.body.First;
    const Last = req.body.Last;
    const Email = req.body.Email;
    console.log(First+Last+Email);

    const data = {
        members:[{
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME:First,
                LNAME:Last
            }
        }]
    };

    const jsondata = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/69e0d253e9";
    const options = {
        method:"POST",
        auth:"Utkarsh:c65a35d7411f3fc7b755d5d5c0a6fd4b-us9"
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode == 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    
    request.write(jsondata);
    request.end();


});


app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log('server is running on port 3000');
});


