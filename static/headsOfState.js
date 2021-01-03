
//connection string
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

//define const
const dbName = 'headsOfStateDB'
const colName = 'headsOfState'

//set variables
var headsOfStateDB
var headsOfState

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((client) => {
        //specific database
        headsOfStateDB = client.db(dbName)
        //what collection
        headsOfState = headsOfStateDB.collection(colName)
    })
    .catch((error) => {
        console.log(error)
    })

var getHeadOfState = function() { 
    
    return new Promise((resolve, reject) => {
        
        var cursor = headsOfState.find()

        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


var addHeadOfState = function(_id, headOfState){

    return new Promise((resolve, reject) => {
        state.insertOne({"_id":_id, "headOfState":headOfState})

        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}


module.exports = { getHeadOfState, addHeadOfState }

