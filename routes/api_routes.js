'use strict'; // Notes


var Entry = require('../models/entry_model');
var Sql = require('sequelize');
var bodyparser = require('body-parser');

var sql = new Sql('entries_dev', 'entries_dev', 'sea-d37', {
    dialect: 'postgres'
});

console.log('reached router');

module.exports = function(router) {

    router.use(bodyparser.json());

    router.get('/entries', function(req, res) {
        sql.sync()
            .then(function() {
                Entry.all()
                    .then(function(data) {
                        res.json(data);
                    })
                    .error(function(err) {
                        console.log(err);
                        res.status(500).json({msg: 'server error'});
                    });
            });
    });

    // router.get('/entries', function(req, res) {
    //     console.log('get route reached');
    //     Entry.find({}, function(err, data)  {
    //         if (err) {
    //             res.status(500).send({msg: 'couldn\'t find data'});
    //             return;
    //         }
    //         res.json(data);
    //     })
    //     // find all
    // });


    router.get('/entries/:id', function(req, res) {
        Entry.find({_id: req.params.id}, function(err, data)  {
            if (err) {
                res.status(500).send({msg: 'couldn\'t find data'});
                return;
            }
            res.json(data);
        })
    });

    // post sequelizer class example
    router.post('/entries', function(req, res) {
        sql.sync()
            .then(function() {
                Entry.create(req.body)
                    .then(function(data) {
                        res.json(data);
                    })
                    .error(function(err) {
                        console.log(err);
                        res.status(500).json({msg: 'internal server error'});
                    });
            });
    });

    // post
    // simple body post - writeFile...
    router.post('/entries', function(req, res) {
        var newEntry = new Entry(req.body);
        newEntry.save(function(err, data) {
            if(err) {res.status(500).send({msg: 'couldn\'t save post'});
            return;}
            res.json(data);
        });
    });


    // put
    // ideally, we need to get a resource to be edited;
    // GET then PUT
    router.put('/entries/:id', function(req, res) {
        var updated = req.body;
        delete updated._id;
        Entry.update({_id:req.parms.id}, updated, function(err) {
            if (err) {
                res.status(500).send({msg: 'couldn\'t save post'});
                return;
            }
            res.json({msg: 'updated!'});
        })
    });



    // delete
    // in this case, delete file;
    router.delete('/entries/:id', function(req, res) {
        Entry.remove({_id:req.params.id}, function(err) {
            if (err) {
                res.status(500).send({msg: 'couldn\'t delete entry'});
                return;
            }
            res.json({msg: 'deleted'});
        });
    });
};