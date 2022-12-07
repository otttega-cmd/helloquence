[
    { 
        description: req.body.description,
        body: req.body.body,
        author: req.body.first_name + ' ' + req.body.last_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,  
        email:req.body.email,
        password: req.body.password,
        publication_time: req.body.publication_time,
        published: req.body.published,
        read_count: req.body.read_count,
        reading_time: req.body.reading_time,
        tags: req.body.tags
    }
]