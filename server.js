const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const router = express.Router();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fs = require('fs');
const path = require('path');

const port = 3000;

const blogs = [

{
    "title": "A New Blog 1",
    "description": "New Disc",
    "blogId": 1
},

{
    "title": "New",
    "description": "New Disc22",
    "blogId": 2
},

{
    "title": "milk",
    "description": "newMilk",
    "blogId": 3
}
];

// const blogDbPath = path.join(__dirname, "db", 'blogs.json');


// const blogDB = path.join(__dirname, "db", "blogs.json");

// Get Routes

//Get Root Directory
app.get ('/', (req, res) => {
    res.send("Hello World");
})


// Get All Blogs

app.get('/blogs', (req, res) => {
    res.send(blogs);
});

 // Get blog by req params

    app.get('/blogs/:findable', (req, res)=>{
        const reqParamString  = req.params.findable;
        const reqParamNumber = Number(reqParamString);

        const notFound = !blogs.includes(reqParamString || reqParamNumber);

        for (let i = 0; i < blogs.length; i++) {
            
           if (notFound){
            res.sendStatus(404);
            break;
           } else if (blogs[i].title === reqParamString) {
                res.send(blogs[i]);
                break;
            }else if (blogs[i].description === reqParamString) {
                res.send(blogs[i]);
                break;
            }else if (blogs[i].blogId === reqParamNumber) {
                res.send(blogs[i]);
                break;
            }
            
        } 
        // {
            // if (blogs[i] == undefined) {
            //     res.send(404);

            // }else if (reqParamString === null || reqParamNumber === null || reqParamString === undefined || reqParamNumber === undefined) {
            //     res.send(404);
            // }else 

            
        // } 

});




// Create New Blog

app.post('/blogs', (req, res)=>{

    console.log(req.body);
    blogs.push(req.body);
    res.status(201).send("Blog Created");
});
    // let body = [];

//     req.on('error', (err)=>{

app.listen(port, ()=>{
    console.log("listening on port " + port);
})