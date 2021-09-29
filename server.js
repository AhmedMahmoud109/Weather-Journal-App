projectData = {};

const express = require('express');
const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const cors = require('cors');
app.use(cors());

app.use(express.static('website'));
const port = 8800;


const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};


app.get('/get',(req,res)=>{

    res.send(projectData);
})

app.post("/post",(req,res)=>{
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feel = req.body.feel;
    
    res.end();
});




















