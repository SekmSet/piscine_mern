mongodump --host="localhost" --port=27042 --db mern-pool --collection students -o backup
mongo --port=27042 mern-pool --eval 'db.students.drop()'
mongorestore  --host="localhost" --port=27042 --db=mern-pool --collection=students backup/mern-pool/students.bson
