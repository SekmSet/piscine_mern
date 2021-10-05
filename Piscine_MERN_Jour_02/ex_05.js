const express = require('express');
const parser = require('body-parser');
const {MongoClient} = require('mongodb');
const app = express()

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');

// Connect to the db
MongoClient.connect("mongodb://localhost:27042", {useNewUrlParser: true, useUnifiedTopology: true},function (err, client ) {
    if(err) {
        console.log("Connection failed.")
        return
    }
    console.log("Connection successfull.")

    const db = client.db('mern-pool')

    app.get('/', function (req, res) {
        res.render('ex_05/index', {message : ''});
    })

    app.post('/register', async function (req, res) {
        const collection = db.collection('students')

        const last_user = await collection.findOne({},{sort:{$natural:-1}});
        const id = last_user === null ? 1 : last_user.id+1

        // if (req.body.firstname !== '' && req.body.lastname !== '' )
        var student = {
            id: parseInt(id),
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            email : req.body.email,
            validated : req.body.validated,
            admin : req.body.admin === 'oui',
        }

        collection.insertOne(student, function(err, insert) {
            if (err) {
                console.log(err)
                res.render('ex_05/index', {message : 'Failed to save the collection.'})
                return
            }
            const message = "Collection saved."
            res.render('ex_05/index', {message : message})
        });
    })

    app.listen(4242, function () {
        console.log('http://localhost:4242 !')
    })
});