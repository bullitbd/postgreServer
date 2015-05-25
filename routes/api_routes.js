'use strict'; // Notes

var Entry = require('../models/entry_model');
var Sql = require('sequelize');
var bodyparser = require('body-parser');

var sql = new Sql('entries_dev', 'entries_dev', 'sea-d37', {
    dialect: 'postgres',
    port: 5432
});

console.log('reached router');

module.exports = function(router) {

    router.use(bodyparser.json());

    router.get('/entries', function(req, res) {
        console.log(req.params);
        sql.sync()
            .then(function() {
                Entry.all()
                    .then(function(data) {
                        res.json(data);
                    })
                    .error(function(err) {
                        console.log(err);
                        res.status(500).json({
                            msg: 'server error'
                        });
                    });
            });
    });

    router.get('/entries/:id', function(req, res) {
        var thisId = req.params.id;
        console.log(thisId);
        Entry.find(
            {where:
                {id: thisId}
            }).then(function(data) {
                res.json(data);
            }).error(function(err) {
                console.log('route error' + err);
                res.status(500).json({msg: 'server error'});

            });
    });

    router.post('/entries', function(req, res) {
        sql.sync()
            .then(function() {
                Entry.create(req.body)
                    .then(function(data) {
                        res.json(data);
                    })
                    .error(function(err) {
                        console.log(err);
                        res.status(500).json({
                            msg: 'internal server error'
                        });
                    });
            });
    });

    router.put('/entries/:id', function(req, res) {
        sql.sync()
            .then(function() {
                Entry.update(
                    {
                        title: req.body.title,
                        ideaBody: req.body.ideaBody,
                        tag: req.body.tag
                    },
                    {where:
                        {id: req.params.id}
                    }
                ) .then(function(data) {
                        res.json(data);
                    })
                    .error(function(err) {
                        console.log(err);
                        res.status(500).json({msg: 'internal server error'});
                    });
            });
    });

    router.delete('/entries/:id', function(req, res) {
        // sql.sync()
        //     .then(function() {
                Entry.destroy(
                    {where:
                        {id: req.params.id}
                    }
                )
                    .then(function(data) {
                        // var message = data === 1 ? 'one record deleted' : 'nothing deleted';
                        // res.json({ msg: message      });
                        res.json(data);
                    })
                    .error(function(err) {
                        console.log(err);
                        res.status(500).json({msg: 'internal server error'});
                    });
            // });
    });
};
