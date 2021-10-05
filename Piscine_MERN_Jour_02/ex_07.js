const express = require('express');
const parser = require('body-parser');
const {MongoClient} = require('mongodb');
const app = express()
const router = express.Router();
const methodOverride = require('method-override');

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(methodOverride('_method'));
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');

// Connect to the db
MongoClient.connect("mongodb://localhost:27042", {useNewUrlParser: true, useUnifiedTopology: true},function (err, client ) {
    if (err) {
        console.log("Connection failed.")
        return
    }
    console.log("Connection successfull.")

    const db = client.db('mern-pool')

    router.get('/', function (req, res) {
        res.render('ex_05/index', {message : '', students : ''});
    })

    router.post('/register', async function (req, res) {
        const collection = db.collection('students')

        const last_user = await collection.findOne({},{sort:{$natural:-1}});
        const id = last_user === null ? 1 : last_user.id+1

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
                res.render('ex_05/index', {message : 'Failed to save the collection.'})
                return
            }
            const message = "Collection saved."

            res.render('ex_05/index', {message : message})
        });
    })

    router.get('/students', function (req, res){
        const collection = db.collection('students')

        var query = { validated: 'in progress' };
        var mysort = { lastname: 1 };

        collection.find(query).sort(mysort).toArray(function(err, result) {
            if (err) {
                console.log(err) ;
                res.render('ex_06/students', {students: [], message : 'no student'})

                return
            }
            res.render('ex_06/students', {students : result, message : ''})
        });
    })

    router.get('/admin', function(req, res) {
        const collection = db.collection('students')

        const sortId = req.query.sortId
        let id = parseInt(req.query.id)

        const sortBy = req.query.sortBy
        const inOrder = parseInt(req.query.inOrder)
        const validated = req.query.validated
        const searchFirstname = req.query.searchFirstname
        const searchLastname = req.query.searchLastname
        const searchEmail = req.query.searchEmail

        let query = {};
        let mysort = {};
        let admin = undefined;

        if(req.query.admin === 'true'){
           admin = true
        } else if(req.query.admin==='false'){
           admin = false
        }

        if (!isNaN(id)) {
            if (sortId !== undefined && sortId !== '') {
                query['id'] = {};
                query['id'][sortId] = id ;
            } else {
                query['id'] = id ;
            }
        } else {
            id = ''
        }

        if(sortBy !== undefined && inOrder !== undefined){
            mysort[sortBy] = inOrder ;
        }

        if(validated !== undefined && validated !== ''){
            query['validated'] = validated;
        }

        if(admin !== undefined && admin !== ''){
            query['admin'] = admin;
        }

        if(searchFirstname !== undefined && searchFirstname !== ''){
            query['firstname'] = searchFirstname;
        }

        if(searchLastname !== undefined && searchLastname !== ''){
            query['lastname'] = searchLastname;
        }
        if(searchEmail !== undefined && searchEmail !== ''){
            query['email'] = searchEmail;
        }

        collection.find(query).sort(mysort).toArray(function(err, result) {
            if (err) {
                console.log(err) ;
                res.render('ex_07/admin', {students: [], message : 'no student', sort : {sortBy, inOrder}, query:{admin, validated, sortId, id, searchFirstname, searchLastname, searchEmail}  })

                return
            }
            res.render('ex_07/admin', {students : result, message : '', sort: {sortBy, inOrder}, query:{admin, validated, sortId, id, searchFirstname, searchLastname, searchEmail} })
        });
    })

    router.get('/admin/add', function(req, res) {
        res.render('ex_07/addStudents', {students : '', message : 'Ajouter'})
    })

    router.post('/admin/add', async function (req, res) {
        const collection = db.collection('students')

        const last_user = await collection.findOne({},{sort:{$natural:-1}});
        const id = last_user === null ? 1 : last_user.id+1

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
                res.render('ex_07/addStudents', {message : 'Failed to save the collection.'})
                return
            }

            res.writeHead(302, { 'Location': '/admin'});
            return res.end();
        });
    })

    router.delete('/admin/delete/:id', function(req, res){
        const collection = db.collection('students')
        const id = parseInt(req.params.id)
        collection.deleteOne({ id })

        res.writeHead(302, { 'Location': '/admin'});
        return res.end();
    })

    router.get('/admin/edit/:id', async function(req, res){
        const collection = db.collection('students')
        const id = parseInt(req.params.id)
        const user = await collection.findOne({ id })

        res.render('ex_07/editStudents', {message : '', student : user})
    })

    router.put('/admin/edit/:id',  async function(req, res){
        const collection = db.collection('students')
        const id = parseInt(req.params.id)

        const student = {
            id: id,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            email : req.body.email,
            validated : req.body.validated,
            admin : req.body.admin === 'oui',
        }

        await collection.updateOne({id},{$set: student});
        res.writeHead(302, { 'Location': '/admin'});
        return res.end();
    })

    app.use('/', router);

    app.listen(4242, function () {
        console.log('http://localhost:4242 !')
    })
});