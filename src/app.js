const path = require('path')

const express = require('express');
const hbs = require('hbs')

// console.log(__dirname);
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()



//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.use(express.static(publicDirectoryPath))


//no longer use
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!!</h1>')
// })




// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Robert',
//         profile: 'associate node js developer'
//     })
// })



// Setup hadlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)



//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lord Voldemort'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is a help text that we are using it dynamically.',
        title: 'A dynamic text',
        name: 'Remember the name'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'An about page!!!!',
        name: 'Not so important'
    })
})

app.get('/about', (req, res) => {
    res.send("this is an about page")
})



// app.get('/weather', (req, res) => {
//     res.send({
//         forecaste: 'It is snowing here',
//         location: 'Alaska'
//     })
// })


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a valid address'
        })
    }

    console.log(req.query.address)
    res.send({
        forecaste: 'It is raining here',
        location: 'Alaska',
        address: req.query.address
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: 'These pages are help related and not created yet, Please do not visit them again and again....I repeat, do not visit them again',
        name: 'Will not introduce myself everytime',
        errorMessage: 'Same as the title given, why are you wasting your time to read the error mesage.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'This page is not created yet, do not visit that too often',
        name: 'none of my concern',
        errorMessage: 'The page is not valid, please try after sometime.'
    })
})


app.listen(3000, ()=> {
    console.log("The server is running on 3000 port. Kindly Check")
})