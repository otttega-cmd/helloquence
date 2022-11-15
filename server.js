const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = '3000';
const HOST_NAME = 'localhost';


// Using path to create a path
const blogDbPath = path.join(__dirname, "db", 'blogs.json');
let blogDB =[];


// To be revised further / Why must the server response be in string format?
let blogs = "";


function requestHandler (req, res) {
    res.setHeader('Content-Type', 'application/json');

//Blogs
    // To Get All Blogs

    if (req.url === '/blogs' && req.method=== 'GET'){
        getAllBlogs(req, res)
    }else if (req.url === '/blogs' && req.method === 'POST'){
        //create new blog
        createNewBlog(req, res)
    }else if (req.url === '/blogs' && req.method === 'PUT' ){
        editBlogPost(req, res)
    }else if (req.url === '/blog' && req.method === 'DELETE'){
        deleteBlogPost(req,res)
    }
}




const getAllBlogs = function (req, res) {
    fs.readFile(blogDbPath, "utf8", (err, blogs) => {
        if (err) {
            console.log(err);
            res.WriteHead(400);
            res.end("An Error Occurred");
        }
    })
    res.end(blogs);
}

const createNewBlog = function (req, res) {
fs.readFile(blogDbPath, "utf8", (err, blogs)=>{
    if (err){
        console.log(err);
        res.WriteHead(400)
        res.end(`An Error With Status Code ${err.statusCode} Occurred`)
    }
        else {
    const body = [];

    req.on('data', (chunk)=>{
        body.push(chunk);
    })

    req.on('end', ()=>{
        const parsedBody = Buffer.concat(body).toString();
        const newBlogPost = JSON.parse(parsedBody);


        blogDB.push(newBlogPost);

        //Write Blog Array to Blog JSON File In DB Using FS Module
        fs.writeFile(blogDbPath, JSON.stringify(blogDB), (err) =>{
            if(err){
                console.log(err);
                res.writeHead(500);
                res.end(JSON.stringify({
                    message: `Could not save book to database.`
                }));
            }

            res.end(JSON.stringify(newBlogPost));
        })
    })
    }   
})
}

const editBlogPost = (req, res) => {

}

const deleteBlogPost = (req, res) => {

}

const server = http.createServer(requestHandler);

server.listen(PORT, HOST_NAME, ()=> {
    //parse file system for blogDbPath and read sync
    blogDB = JSON.parse(fs.readFileSync(blogDbPath, 'utf8'))
    console.log(`Server is listening on ${HOST_NAME}:${PORT}`);
})
// const server = http.createServer(HOST_NAME, PORT, ()=>{
//     speakerDB=JSON.parse(fs.readFileSync(speakerDBPath, 'utf8'));
//     console.log(`Server is running on ${HOST_NAME}:${PORT}`)
// });

