const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = '3000';
const HOST_NAME = 'localhost';

// Using path module to create a path
const blogDbPath = path.join(__dirname, "db", 'blogs.json');
let blogDB = [];


function requestHandler (req, res) {
    res.setHeader('Content-Type', 'application/json');

    //Blogs
    // To Get All Blogs

    if (req.url === '/blogs' && req.method=== 'GET'){
        getAllBlogs(req, res)
    }else if (req.url === '/blogs' && req.method === 'POST'){
        //create new blog
        createBlog(req, res)
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

        res.end(blogs);
    })
    
}
console.log("🚀 ~ file: server.js ~ line 53 ~ getAllBlogs ~ getAllBlogs", getAllBlogs)


// To Create A New Blog Post
// function createBlog (req, res) {
//     console.log("🚀 ~ file: server.js ~ line 53 ~ createBlog ~ function")
//     const body = [];

//     req.on('data', (chunk) => {
//         body.push(chunk);
//     }).end('end', ()=> {
//         console.log("🚀 ~ file: server.js ~ line 58 ~ req.on ~ .end")
//         bufferBody = Buffer.concat(body).toString();
//         parsedBody = JSON.parse(bufferBody);
//         console.log(parsedBody);
//         res.WriteHead(200, { 'Content-Type': 'application/json'});

//     });
//     console.log("🚀 ~ file: server.js ~ line 59 ~ req.on ~ req.on")
// }

const editBlogPost = (req, res) => {

}

const deleteBlogPost = (req, res) => {

}

const server = http.createServer(requestHandler);

server.listen(PORT, HOST_NAME, ()=> {
    //parse file system for blogDbPath and read sync
    blogDB = JSON.parse(fs.readFileSync(blogDbPath, 'utf8'))
    console.log(`Server is listening on ${HOST_NAME}:${PORT}`);
});