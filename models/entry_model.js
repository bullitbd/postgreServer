'use strict';

var Sql = require('sequelize');

var sql = new Sql('entries_dev', 'entries_dev', 'sea-d37', {
    dialect: 'postgres'
});

var Entry = module.exports = sql.define('Entry', {
    title: Sql.STRING,
    ideaBody: Sql.STRING,
    tag: Sql.STRING
});

Entry.sync();