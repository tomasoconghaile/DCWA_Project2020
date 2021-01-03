var express = require('express');
var countries = require('../static/countries')
var cities = require('../static/cities')
var headsOfState = require('../static/headsOfState')
//import body-parser + ejs
var bodyParser = require('body-parser');
var ejs = require('ejs');

var countries = require('../static/countries');
//import express-validator also has to be installed - npm install express-validator
const { validationResult, check } = require('express-validator');
var cities = require('../static/cities')

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req, res) => { 
    res.sendFile(__dirname + "/views/index.html")

   
})

//Countries
app.get('/listCountries', (req, res) => {
    countries.getCountries()
    .then((result)=> {
        console.log(result)
        res.render('showCountries', {countries:result})
    })
    .catch((error)=> {
        res.send(error)
    })
})

//Citires
app.get('/listCities', (req, res) => {
    cities.getCities()
    .then((result)=> {
        console.log(result)
        res.render('showCities', {cities:result})
    })
    .catch((error)=> {
        res.send(error)
    })
})

//how to add a country
//add Country page
app.get('/addCountry', (req, res) => {
  //defining the error
  res.render('addCountry', { errors: undefined })
})

app.post('/addCountry',

[check('code').isLength({ min: 3, max: 3 }).withMessage("Country Code must be 3 characters"),
check('name').isLength({ min: 3 }).withMessage("Country Name must be at least 3 characters"),
],
  /* checks that the code is meeting the right requirements for length ..
*/
  (req, res) => {

    var errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render("addCountry", { errors: errors.errors })
    } else {
      //console.log(req.body)

      countries.addCountries(req.body.code, req.body.name, req.body.details)
        .then((result) => {
          res.redirect('/listCountries')
        })
        .catch((error) => {
          res.send("Error: " + req.body.code + " already exists")
        })
    }
  })

app.post('/updateCountry',


  [check('name').isLength({ min: 1 }).withMessage("The Country Name is mandatory")],

  (req, res) => {

    var errors = validationResult(req)

    if (!errors.isEmpty()) {
      //res.render("addCountry", {errors:errors.errors, co_code:req.body.co_code, co_name:req.body.co_name, co_details:req.body.co_details})
      res.render("updateCountry", { errors: errors.errors, countries: errors.errors })
    } else {
      //console.log(req.body)

      countries.updateCountry(req.body.name, req.body.details, req.body.code)
        .then((result) => {
          res.redirect('/listCountries')
        })
        .catch((error) => {
          res.send(error)
        })
    }
  })

  //update 
app.get('/updateCountry/:code', (req, res) => {
  countries.displayCountry(req.params.code)
    .then((result) => {
      res.render('updateCountry', { countries: result, errors: undefined })
    })
    .catch((error) => {
      res.send(error)
    })

})



  //How to delete a country and making sure not to delete a country with city details 
app.get('/deleteCountry/:code', (req, res) => {
    countries.deleteCountry(req.params.code)
    .then((result) => {
        res.redirect("/listCountries")
        })
        .catch((error) => {
            if(error.code == "ER_ROW_IS_REFERENCED_2"){
                res.send("<h1>Error: Country " + req.params.country + " has cities, cannot be deleted.</h1>")
            }
            else{
                res.send(error.message)
                console.log(error)
            }
        })
    
    })

    //allDetails - output the page to screen to show all details of cities
app.get('/allCityDetails/:code', (req, res) => {
    cities.displayEachCity(req.params.code)
      .then((result) => {
        res.render('allCityDetails', { cities: result })
      })
      .catch((error) => {
        res.send(error)
      })
  })


    //allDetails - showing each city 
app.get('/allCityDetails', (req, res) => {
    cities.displayAllCityDetails()
      .then((result) => {
        res.render('allCityDetails', { cities: result })
      })
      .catch((error) => {
        res.send(error)
      })
  })

  //HeadOfState
  app.get('/listHeadsOfState', (req, res) => {
    headsOfState.getHeadOfState()
      .then((documents) => {
        res.render('showHeadsOfState', { headsOfState: documents })
      })
      .catch((error) => {
        res.send(errorS)
      })
  })

  //How to add a new HeadOfState
  app.get('/addHeadOfState', (req, res) => {
    res.render('addHeadOfState', { errors: undefined })
  })
  
  //Checks that the new criteria makes the requirements
  app.post('/addHeadOfState',
  
    [check('_id').isLength({ min: 3, max: 3 }).withMessage("Country Code must be 3 characters"),
    check('headOfState').isLength({ min: 3 }).withMessage("Head Of State must be at least 3 characters"),
  
  ],
    (req, res) => {
  
      var errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        res.render("addHeadOfState", { errors: errors.errors })
      } else {
        headsOfState.addHeadOfState(req.body._id, req.body.headOfState)
          .then((result) => {
            res.redirect('/listHeadsOfState')
          })
          .catch((error) => {
            res.send("Error: " + req.body._id + " already exists")
          })
      }
    })
  

    //Opens on localhost:3008
app.listen(3008, () =>{
    console.log("Listening on Port 3008")
})