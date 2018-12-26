const fs = require('fs');
const express = require('express');
const router = express.Router();
const axios = require('axios');

/*
   == == == == == == == == == == == == == == == == == == == == == == == == == == == == == == ==
   ==  Stephan gebruik localhost:10987 of pas hier beneden $rootUrl je poort aan             ==
   == == == == == == == == == == == == == == == == == == == == == == == == == == == == == == ==

   == == == == == == == == == == == == == == == == == == == == == == == == == == == == == == == == ==
   ==  Helaas is het niet mogelijk om met Axios een view te renderen of te redirecten na een post  ==
   == == == == == == == == == == == == == == == == == == == == == == == == == == == == == == == == ==
 */

let rootUrl = "http://localhost:10987";

//render task adding view
router.get('/add', (req, res, next) => {
    res.render('add')
});

//To add a task
router.post('/add', (req, res, next) => {
    axios.post(`${rootUrl}/api/task`, { title: req.body.title })
        .then((api) => {
            // console.log(api.data);
            res.send('Task title has been added! p.s: Stephan apparently, you cannot do a redirect from the server when you make an Axios post request. ')
        })
        .catch((err) => {
            console.log(err)
        })
});

// To delete a task
router.post('/delete/:id', (req, res, next) => {
    axios.delete(`${rootUrl}/api/task`, { data: { id: req.body.id }})
        .then((api) => {
            // console.log(api.data);
            res.send('Task title has been deleted! p.s: Stephan apparently, you cannot do a redirect from the server when you make an Axios post request. ')
        })
        .catch((err) => {
            console.log(err)
        })
});

// To edit a task
router.post('/edit/:id', (req, res, next) => {
    // console.log(req.body.title, req.params.id);
    axios.put(`${rootUrl}/api/task`, { title: req.body.title, id: req.params.id })
        .then((api) => {
            res.send('Task title has been updated! p.s: Stephan apparently, you cannot do a redirect from the server when you make an Axios post request. ')
        })
        .catch((err) => {
            console.log(err)
        })
});

// Gets edit view with requested task data
router.get('/edit/:id', (req, res, next) => {
    axios.get(`${rootUrl}/api/task/${req.params.id}`)
        .then((api) => {
            res.render('edit', { data:api.data })
            // console.log(api.data);
        })
        .catch((err) => {
            console.log(err)
        })
});

// Rendering home page with tasks inside
router.get('/', (req, res, next) => {
    axios.get(`${rootUrl}/api/tasks`)
        .then((api) => {
            res.render('index', { data:api.data});
            // console.log(api.data);
        })
        .catch( (err) => {
            console.log(err);
        })
});

module.exports = router;