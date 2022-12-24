const mongoose = require('mongoose');

// Import the models
const Blog = require("../models/blog_model");
const Author = require("../models/author_model");

exports.search_get = (req, res, next) => {
  // Make sure that the "q" query parameter is provided
  if (!req.query.q) {
    return res.status(400).send('Missing search parameter');
  }

  // Split the search parameter into an array of words
    const searchWords = req.query.q.split(' ');
    const searchTerm = searchWords[0];



  async function search () {
    try {
    // Search for documents in the blogs collection with a title that contains any of the search words
        const blogSearchResults = await Blog.find({
        $or: searchWords.map(word => ({
          title: { $regex: word, $options: 'i' }
        }))
      });

//     // Search for documents in the authors collection with a first name aor last name that contains any of the search words
    const authorSearchResults = await Author.find({
    $or: [
      { first_name: { $regex: searchTerm, $options: 'i' } },
      { last_name: { $regex: searchTerm, $options: 'i' } }
    ]
  }).select({ first_name: 1, last_name: 1 });
  
  
    // Concatenate the search results from both collections
    const searchResults = blogSearchResults.concat(authorSearchResults);;
    return searchResults;
    } catch (error) {
    // Log the error to the console
    console.error(error);
    // Send a response to the client with a status code of 500 (Internal Server Error) and a message
    res.status(500).send('An error occurred'); 
    }
  }
 
  search().then(searchResults=>{
    res.render('search_results', {
        title: "Search Results",
        searchResults: searchResults
    }
    )
    console.log(searchResults);
  })
}
