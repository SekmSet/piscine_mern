# Piscine MERN : J-2

## Install MongoDb 

[Website](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

[GitHUb](https://github.com/mongodb/homebrew-brew)

### MongoDb as service 

**Start MongoDB**
```bash
brew services start mongodb-community
```

**Stop MongoDB**
```bash
brew services stop mongodb-community
```

**Check if MongoDB is running**
```bash
ps aux | grep -v grep | grep mongod
```

**Change port of MongoDb**
```bash
nano /usr/local/etc/mongod.conf
mongo --port 27042
```

## Form with : delete / put …

[Documentation](https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2)
