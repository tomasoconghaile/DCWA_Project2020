var mysql = require('promise-mysql');

var pool

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

    //gets all the cities from geograpghy db
var getCities = function() {
    return new Promise((resolve, reject) => {
        pool.query('select * from city')
        .then((result) => {
            resolve(result)
        })
        .catch((error)=> {
            reject(error)
        })
    })
}
//displays the city details separately

var allCityDetails = function() {
    return new Promise((resolve, reject) => {
        pool.query('select city.cty_code,city.co_code, city.cty_name, city.population, city.isCoastal, city.areaKM, country.co_name from city left join country on city.co_code = country.co_code;')
        .then((result) => {
            resolve(result)
        })
        .catch((error)=> {
            reject(error)
        })
    })
}

//displaying the page allCityDetails
var displayEachCity = function (cty_code) {

    return new Promise((resolve, reject) => {
       
        var myQuery = {
            sql: 'select city.cty_code,city.co_code, city.cty_name, city.population, city.isCoastal, city.areaKM, country.co_name from city left join country on city.co_code = country.co_code where city.cty_code = ?',
            values: [cty_code]
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

//Links so can be used/called in another class
module.exports = { getCities, allCityDetails, displayEachCity }