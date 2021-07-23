const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const db = require('../config/database');
const users = require('./users');
const auth = require('./auth');

mongoose.connect(db());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


//--------------------------------------> routes
app.get('/', (req, res) => {
    res.status(200).json({
        name: 'Foo Fooing Bar'
    });
});

app.post('/user', function (req, res) {
    users.create(req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        handleError(res, err);
    });
});

app.get('/user/:id', function (req, res) {
    users.get(req.params.id, function (err, result) {
        if (err) {
            return handleError(err);
        }

        res.json(result);
    });
});

app.put('/user/:id', function (req, res) {
    // res.send('User route')
    users.update(req.params.id, req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        handleError(res, err);
    });
});

app.delete('/user/:id', auth.isAuthorized, function (req, res) {
    users.delete({id: req.params.id, name: 'foo'}).then((result) => {
        res.json(result);
    }).catch((err) => {
        handleError(res, err);
    });
});

app.get('/reset/:email', function (req, res) {
    users.resetPassword(req.params.email).then((result) => {
        res.json({
            message: 'Password reset email has been sent.'
        });
    }).catch((err) => {
        handleError(res, err);
    });
});

function handleError(res, err) {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(400).json(err);
}


//--------------------------------------> misc
//404
app.use((req, res, next) => {
    return res.status(404).send('404 - Page Not Found.');
});

//500
app.use((err, req, res) => {
    res.status = err.status || 500;
    return res.send(res.status + '. An unknown error has occured.');
});


module.exports = app;