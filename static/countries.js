var mysql = require('promise-mysql');

var pool
//Pool connection that alloows access to db geography
mysql.createPool({
    connectionLimit : 3,
    host : 'localhost',
    user : 'root',
    password : 'Leitirmor1',
    database : 'geography'
    })
    .then((result) => {
        pool = result
    })
    .catch((error) => {
        console.log(error)
    });

    //lists all countries
var getCountries = function() {
    return new Promise((resolve, reject) => {
        pool.query('select * from country')
        .then((result) => {
            resolve(result)
        })
        .catch((error)=> {
            reject(error)
        })
    })
}
//Adds a country to db
var addCountries = function(co_code, co_name, co_details){
      
    return new Promise((resolve, reject) => {
        pool.query('insert into country set ?', { co_code, co_name, co_details})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
  }

//deletes a country from db
var deleteCountry = function(co_code){
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'delete from country where co_code = ?',
            values: [co_code]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })

    })
}
//updates a country details
var updateCountry = function(co_name, co_details, co_code){

    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'update country set co_name = ?, co_details = ? where co_code = ?',
            values: [co_name, co_details, co_code]
        }
        pool.query(myQuery)

        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
  }

var displayCountry = function(co_code){
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql:  'select * from country where co_code = ?',
            values: [co_code]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}
//Allows to be used/called in index.js 
module.exports = { getCountries, addCountries, deleteCountry, updateCountry, displayCountry }