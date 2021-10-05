//npm install mongodb

const {MongoClient} = require('mongodb');

// Connect to the db
MongoClient.connect("mongodb://localhost:27042", { useNewUrlParser: true,  useUnifiedTopology: true}, function (err, client ) {
    if (err) {
        console.log("Connection failed.")
        return
    }
    // choose my db
    client.db('mern-pool')
    console.log("Connection successfull.")
})
